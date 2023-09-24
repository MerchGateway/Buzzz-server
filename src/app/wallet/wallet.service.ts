import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessResponse } from '../../utils/response';
import { WalletTransactionsService } from '../wallet-transactions/wallet-transactions.service';
import { Wallet } from './entities/wallet.entity';
import { WithdrawFromWalletDto } from './dto/withdraw-from-wallet.dto';
import { User } from '../users/entities/user.entity';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { uuid } from 'uuidv4';
import {
  TransactionMethod,
  TransactionStatus,
  TransactionType,
} from '../wallet-transactions/entities/wallet-transaction.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly transactionRepository: Repository<Transaction>,
    private walletTransactionService: WalletTransactionsService,
    private paystackBrokerService: PaystackBrokerService,
  ) {}

  async createWallet() {
    const wallet = this.walletRepository.create();
    return await this.walletRepository.save(wallet);
  }

  async getByWalletId(walletId: string) {
    const wallet = await this.walletRepository.findOneBy({ id: walletId });

    if (!wallet) {
      throw new NotFoundException(`Wallet ${walletId} not found`);
    }

    const balance = await this.walletTransactionService.getBalanceForWalletId(
      walletId,
    );

    return new SuccessResponse(
      {
        ...wallet,
        balance,
      },
      'wallet retrieved',
      HttpStatus.OK,
    );
  }

  async withdrawFromWallet(
    withdrawFromWalletDto: WithdrawFromWalletDto,
    user: User,
  ) {
    const balance = await this.walletTransactionService.getBalanceForWalletId(
      user.wallet.id,
    );

    const isPinMatch = await user.matchPin(withdrawFromWalletDto.pin);

    if (!isPinMatch) {
      throw new UnauthorizedException('Invalid pin');
    }

    if (balance < withdrawFromWalletDto.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const bankList = await this.paystackBrokerService.getBankList();
    const bankCodesList = bankList.map((bank) => bank.code);

    if (!bankCodesList.includes(withdrawFromWalletDto.bankCode)) {
      throw new BadRequestException('Invalid bank code');
    }

    let recipientCode: string = undefined;

    try {
      const recipient =
        await this.paystackBrokerService.createTransferRecipient(
          user.name,
          withdrawFromWalletDto.accountNumber,
          withdrawFromWalletDto.bankCode,
        );
      recipientCode = recipient.data.recipient_code;
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }

    const transferReferenceDetails = {
      reason: 'Withdrawal',
      amount: withdrawFromWalletDto.amount,
      reference: uuid(),
      recipient: recipientCode,
    };

    try {
      await this.paystackBrokerService.initiateTransfer(
        transferReferenceDetails.amount,
        transferReferenceDetails.recipient,
        transferReferenceDetails.reason,
        transferReferenceDetails.reference,
      );
    } catch (e) {
      throw new HttpException(e.message, e.statusCode);
    }

    const transaction = this.transactionRepository.create({
      amount: withdrawFromWalletDto.amount,
      currency: 'NGN',
      channel: 'bank_transfer',
      user,
      reference: transferReferenceDetails.reference,
    });
    await transaction.save();

    return new SuccessResponse({}, 'Withdrawal successfully initiated');
  }
}

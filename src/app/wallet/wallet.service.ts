import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessResponse } from '../../utils/response';
import { Wallet } from './entities/wallet.entity';
import { WithdrawFromWalletDto } from './dto/withdraw-from-wallet.dto';
import { User } from '../users/entities/user.entity';
import { PaystackBrokerService } from '../payment/paystack/paystack.service';
import { uuid } from 'uuidv4';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';
import {
  TransactionChannel,
  TransactionCurrency,
  TransactionMethod,
} from '../../types/transaction';
import { SetPinDto } from './dto/set-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { ResolveAccountNumberDto } from './dto/resolve-account-number.dto';
import { FeeService } from '../fee/fee.service';
import { OtpService } from '../otp/otp.service';
import { OTPReason } from '../../types/otp';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
    @Inject(forwardRef(() => PaystackBrokerService))
    private paystackBrokerService: PaystackBrokerService,
    private feeService: FeeService,
    private otpService: OtpService,
    private mailService: MailService,
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

    const balance = await this.transactionService.getBalanceForWalletId(
      walletId,
    );

    return new SuccessResponse(
      {
        ...wallet,
        balance,
      },
      'Wallet retrieved',
      HttpStatus.OK,
    );
  }

  async geWalletBalance(walletId: string, user: User) {
    user = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['wallet'],
    });

    const wallet = await this.walletRepository.findOneBy({ id: walletId });

    if (!wallet) {
      throw new NotFoundException(`Wallet ${walletId} not found`);
    }

    if (wallet.id !== user.wallet.id) {
      throw new UnauthorizedException('Invalid wallet id');
    }

    const balance = await this.transactionService.getBalanceForWalletId(
      walletId,
    );

    return new SuccessResponse(
      {
        ...wallet,
        balance,
      },
      'Wallet retrieved',
      HttpStatus.OK,
    );
  }

  async validatePin(id: string, enteredPin: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.pin')
      .getOne();

    if (!user) {
      return null;
    }

    const isMatch = await user.matchPin(enteredPin);

    if (!isMatch) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pin, ...result } = user;

    return result as User;
  }

  async sendPinResetOTP(user: User) {
    const opt = await this.otpService.generateOtp(OTPReason.PIN_RESET, user);

    await this.mailService.sendOtp(user, opt);

    return new SuccessResponse({}, 'OTP sent to email successfully');
  }

  async setWalletPin(user: User, setPinDto: SetPinDto) {
    const isValidOTP = await this.otpService.verifyOtp(
      setPinDto.otp,
      user,
      OTPReason.PIN_RESET,
    );

    if (!isValidOTP) {
      throw new BadRequestException('Invalid OTP.');
    }

    if (user.hasPin) {
      throw new BadRequestException('Wallet pin already set');
    }

    user.pin = setPinDto.pin;
    await user.save();

    return new SuccessResponse({}, 'Wallet pin set successfully');
  }

  async updateWalletPin(user: User, updatePinDto: UpdatePinDto) {
    if (!user.hasPin) {
      throw new BadRequestException('Wallet pin not set');
    }

    const isValidPin = await this.validatePin(user.id, updatePinDto.oldPin);

    if (!isValidPin) {
      throw new UnauthorizedException('Invalid wallet pin');
    }

    user.pin = updatePinDto.newPin;
    await user.save();

    return new SuccessResponse({}, 'Wallet pin updated successfully');
  }

  async withdrawFromWallet(
    withdrawFromWalletDto: WithdrawFromWalletDto,
    user: User,
  ) {
    user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .addSelect('user.pin')
      .leftJoinAndSelect('user.wallet', 'wallet')
      .getOne();

    const balance = await this.transactionService.getBalanceForWalletId(
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
          user.firstName,
          withdrawFromWalletDto.accountNumber,
          withdrawFromWalletDto.bankCode,
        );
      recipientCode = recipient.data.data.recipient_code;
    } catch (error) {
      throw new HttpException(
        error.response.data.message || error.message,
        error.response.status,
      );
    }

    const transferReferenceDetails = {
      reason: 'Withdrawal',
      amount: withdrawFromWalletDto.amount,
      reference: uuid(),
      recipient: recipientCode,
    };

    let transferCode: string;

    try {
      const amountInKobo = transferReferenceDetails.amount * 100;
      transferCode = await this.paystackBrokerService.initiateTransfer(
        amountInKobo,
        transferReferenceDetails.recipient,
        transferReferenceDetails.reason,
        transferReferenceDetails.reference,
      );
    } catch (error) {
      throw new HttpException(
        error.response.data.message || error.message,
        error.response.status,
      );
    }

    const fee = await this.feeService.getLatest();

    const transaction = this.transactionRepository.create({
      amount: withdrawFromWalletDto.amount,
      currency: TransactionCurrency.NGN,
      channel: TransactionChannel.BANK_TRANSFER,
      method: TransactionMethod.DEBIT,
      wallet: user.wallet,
      fee,
      feeAmount: withdrawFromWalletDto.amount,
      reference: transferReferenceDetails.reference,
      transferCode,
    });
    await transaction.save();

    return new SuccessResponse(
      transaction,
      'Withdrawal successfully initiated',
    );
  }

  async getBankList() {
    const bankList = await this.paystackBrokerService.getBankList();
    const parsedBankList = bankList.map((bank) => ({
      id: bank.id,
      code: bank.code,
      name: bank.name,
      slug: bank.slug,
    }));
    return new SuccessResponse(parsedBankList, 'Bank list retrieved');
  }

  async resolveAccountNumber(resolveAccountNumberDto: ResolveAccountNumberDto) {
    let resolvedAccount;
    try {
      resolvedAccount = await this.paystackBrokerService.resolveAccountNumber(
        resolveAccountNumberDto.accountNumber,
        resolveAccountNumberDto.bankCode,
      );
    } catch (error) {
      throw new HttpException(
        error.response.data.message || error.message,
        error.response.status,
      );
    }

    return new SuccessResponse(resolvedAccount, 'Account resolved');
  }
}

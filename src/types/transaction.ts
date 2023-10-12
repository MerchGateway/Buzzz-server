export enum TransactionStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
}

export enum TransactionMethod {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum TransactionType {
  WITHDRAWAL = 'WITHDRAWAL',
  SALES = 'SALES',
}

export enum TransactionChannel {
  CARD = 'CARD',
  BANK = 'BANK',
  USSD = 'USSD',
  QR = 'QR',
  MOBILE_MONEY = 'MOBILE_MONEY',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum TransactionCurrency {
  NGN = 'NGN',
}

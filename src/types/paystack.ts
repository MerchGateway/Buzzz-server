import { TransactionCurrency } from './transaction';

export enum PaystackEvent {
  CHARGE_SUCCESS = 'charge.success',
  TRANSFER_SUCCESS = 'transfer.success',
  TRANSFER_FAILED = 'transfer.failed',
  TRANSFER_REVERSED = 'transfer.reversed',
  TRANSFER_ABANDONED = 'transfer.abandoned',
  TRANSFER_BLOCKED = 'transfer.blocked',
  TRANSFER_REJECTED = 'transfer.rejected',
}

export interface PaystackChargeEventData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: TransactionCurrency;
  ip_address: string;
  metadata: any;
  log: any;
  fees: number;
  fees_split: any;
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
  };
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    customer_code: string;
    phone: string;
    metadata: any;
    risk_action: string;
  };
  requested_amount: number;
  paidAt: string;
}

export interface TransferEventData {
  amount: number;
  currency: TransactionCurrency;
  domain: string;
  failures: any;
  id: number;
  integration: {
    id: number;
    is_live: boolean;
    business_name: string;
  };
  reason: string;
  reference: string;
  source: string;
  source_details: any;
  status: string;
  titan_code: any;
  transfer_code: string;
  transferred_at: any;
  recipient: {
    active: boolean;
    currency: TransactionCurrency;
    description: string;
    domain: string;
    email: any;
    id: number;
    integration: number;
    metadata: any;
    name: string;
    recipient_code: string;
    type: string;
    is_deleted: boolean;
    details: {
      account_number: string;
      account_name: any;
      bank_code: string;
      bank_name: string;
    };
    created_at: string;
    updated_at: string;
  };
  session: {
    provider: any;
    id: any;
  };
  created_at: string;
  updated_at: string;
}

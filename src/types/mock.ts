export type MockTransaction = {
  id: string;
  type: 'topup' | 'paid';
  amount: number;
  date: Date;
  reference: string;
  charge: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  paymentMethod: 'transfer' | 'card';
};

export interface PaymentIntentData {
  amount: number;
  currency: string;
  metadata?: {
    studentName?: string;
    studentEmail?: string;
    course?: string;
    intake?: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
  clientSecret?: string;
}
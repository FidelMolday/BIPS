import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertCircle,
  Banknote,
  CheckCircle,
  CreditCard,
  Loader2,
  Lock,
  Shield,
  ShieldCheck,
} from 'lucide-react';

interface PaystackPaymentProps {
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  description?: string;

  paymentType?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  sponsorName?: string;

  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: string) => void;
  onAmountChange?: (newAmount: number) => void;
}

const API_BASE = 'https://paystack-5vql.onrender.com';

const CURRENCIES = [
  { value: 'KES', label: 'KES - Kenyan Shilling' },
  { value: 'USD', label: 'USD - US Dollar' },
];

export const PaystackPayment = ({
  amount: initialAmount,
  currency = 'KES',
  customerEmail = '',
  customerName = '',
  customerPhone = '',
  description = 'Course Registration Fee',

  paymentType = 'individual',
  invoiceId,
  invoiceNumber,
  sponsorName,

  onPaymentSuccess,
  onPaymentError,
  onAmountChange,
}: PaystackPaymentProps) => {
  const [amount, setAmount] = useState(initialAmount);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [email, setEmail] = useState(customerEmail);
  const [name, setName] = useState(customerName);
  const [phone, setPhone] = useState(customerPhone);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'bank'>(
    'online'
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAmountChange = (value: number) => {
    setAmount(value);
    onAmountChange?.(value);
  };

  const handlePayment = async () => {
    setError(null);

    if (!name) {
      setError('Please enter your full name.');
      return;
    }

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }

    // For invoice payments the amount comes from the invoice itself,
    // so we don't require it here. For donations we do.
    if (!invoiceId && (!amount || amount <= 0)) {
      setError('Please enter a valid payment amount.');
      return;
    }

    if (paymentMethod === 'bank') {
      // Bank transfer is recorded manually — nothing to submit online.
      setError(
        'Please make the bank transfer using the account details provided above, then submit your receipt along with your admission documents.'
      );
      return;
    }

    setLoading(true);

    try {
      // ===== Choose the right endpoint based on whether we have an invoice =====
      let endpoint: string;
      let body: Record<string, unknown>;

      if (invoiceId) {
        // Sponsor invoice payment
        endpoint = `${API_BASE}/api/invoices/initialize-payment`;
        body = {
          invoiceId,
          email,
        };
      } else {
        // Generic / donation-style payment
        endpoint = `${API_BASE}/api/donations/initialize`;
        body = {
          email,
          amount,
          name: name || 'BIPS Student',
          currency: selectedCurrency,
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to initialize payment.');
      }

      const authorizationUrl = result.data?.authorization_url;
      const reference = result.data?.reference;

      if (!authorizationUrl) {
        throw new Error(
          'Payment initialized but no Paystack checkout URL was returned.'
        );
      }

      // Remember context for the success page
      if (reference) {
        sessionStorage.setItem('paystack_reference', reference);
      }
      sessionStorage.setItem('paystack_payment_type', paymentType);
      sessionStorage.setItem(
        'paystack_amount',
        String(result.data?.amount ?? amount)
      );
      sessionStorage.setItem(
        'paystack_currency',
        result.data?.currency ?? selectedCurrency
      );

      if (invoiceId) {
        sessionStorage.setItem('paystack_invoice_id', invoiceId);
      }
      if (invoiceNumber) {
        sessionStorage.setItem('paystack_invoice_number', invoiceNumber);
      }

      // Optional: notify parent that init succeeded before redirect
      onPaymentSuccess?.({
        success: true,
        reference,
        amount,
        currency: selectedCurrency,
        redirecting: true,
      });

      window.location.href = authorizationUrl;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to initialize payment. Please try again.';

      console.error('Paystack payment error:', err);
      setError(message);
      onPaymentError?.(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful</h3>
            <p className="text-muted-foreground">
              Your payment of {selectedCurrency} {amount.toLocaleString()} has
              been processed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
            <CreditCard className="w-6 h-6" />
            Payment Options
          </h3>
          <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Secure
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-blue-500" />
              Protected
            </span>
          </div>
        </div>

        {/* Amount */}
        <div>
          <h4 className="text-lg font-bold text-center">
            Enter Payment Amount
          </h4>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Enter the amount you want to pay
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="paystackAmount">Amount</Label>
              <Input
                id="paystackAmount"
                type="number"
                min="1"
                step="1"
                value={amount}
                disabled={!!invoiceId}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paystackCurrency">Currency</Label>
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger id="paystackCurrency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            Minimum amount: {selectedCurrency} 1
          </p>
        </div>

        {/* Student Information */}
        <div className="rounded-lg border p-4 space-y-3">
          <h4 className="font-bold">Student Information</h4>

          <div className="space-y-2">
            <Label htmlFor="paystackName">Full Name *</Label>
            <Input
              id="paystackName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paystackEmail">Email Address *</Label>
            <Input
              id="paystackEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paystackPhone">Phone Number *</Label>
            <Input
              id="paystackPhone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* Select Payment Method */}
        <div className="space-y-3">
          <h4 className="font-bold">Select Payment Method</h4>

          <button
            type="button"
            onClick={() => setPaymentMethod('online')}
            className={`w-full flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
              paymentMethod === 'online'
                ? 'border-primary bg-primary/5'
                : 'border-border'
            }`}
          >
            <CreditCard className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-grow">
              <p className="font-semibold">Online Payment</p>
              <p className="text-sm text-muted-foreground">
                Pay instantly with card, mobile money, or bank transfer
              </p>
            </div>
            <span
              className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === 'online'
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground'
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
            className={`w-full flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
              paymentMethod === 'bank'
                ? 'border-primary bg-primary/5'
                : 'border-border'
            }`}
          >
            <Banknote className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-grow">
              <p className="font-semibold">Bank Transfer</p>
              <p className="text-sm text-muted-foreground">
                Pay via bank deposit and submit receipt later
              </p>
            </div>
            <span
              className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === 'bank'
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground'
              }`}
            />
          </button>
        </div>

        {/* Secure payment note */}
        <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Your payment is processed securely through Paystack. We never
            store your card details.
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Payment summary (kept for invoice / sponsor context) */}
        {(invoiceNumber || sponsorName) && (
          <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground">Amount to Pay</p>
            <p className="text-2xl font-bold text-primary">
              {selectedCurrency} {amount.toLocaleString()}
            </p>
            {invoiceNumber && (
              <p className="text-xs text-muted-foreground mt-1">
                Invoice: {invoiceNumber}
              </p>
            )}
            {sponsorName && (
              <p className="text-xs text-muted-foreground mt-1">
                Sponsor: {sponsorName}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          </div>
        )}

        {/* Pay button */}
        <Button
          type="button"
          onClick={handlePayment}
          disabled={loading || (!invoiceId && amount <= 0)}
          className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Initializing Payment...
            </>
          ) : (
            <>
              Pay {selectedCurrency} {amount.toLocaleString()} Online
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaystackPayment;
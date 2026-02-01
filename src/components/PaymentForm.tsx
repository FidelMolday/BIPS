import { useState, FormEvent } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, CheckCircle, Shield, Lock, AlertCircle, Edit, Plus } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: string) => void;
  onAmountChange?: (newAmount: number) => void;
}

export const PaymentForm = ({ 
  amount: initialAmount, 
  currency = 'KES', 
  customerEmail = 'student@bips.com',
  customerName = 'BIPS Student',
  description = 'Course Registration Fee',
  onPaymentSuccess,
  onPaymentError,
  onAmountChange
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');

  const predefinedAmounts = [
    { value: 5000, label: 'KES 5,000', description: 'Application Fee' },
    { value: 10000, label: 'KES 10,000', description: 'Deposit' },
    { value: 25000, label: 'KES 25,000', description: '1st Semester' },
    { value: 50000, label: 'KES 50,000', description: 'Full Year' }
  ];

  const handleCustomAmountSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(customAmount);
    if (parsedAmount > 0) {
      setAmount(parsedAmount);
      setShowCustomAmount(false);
      setCustomAmount('');
      onAmountChange?.(parsedAmount);
      setError(null);
    } else {
      setError('Please enter a valid amount greater than 0');
    }
  };

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    setShowCustomAmount(false);
    setCustomAmount('');
    onAmountChange?.(newAmount);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Payment system has not loaded yet. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Submit payment details to Stripe
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Please check your payment details');
        onPaymentError?.(submitError.message || 'Please check your payment details');
        setIsLoading(false);
        return;
      }

      // Confirm payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed. Please try again.');
        onPaymentError?.(confirmError.message || 'Payment failed. Please try again.');
        setIsLoading(false);
        return;
      }

      // Payment succeeded
      setPaymentSuccess(true);
      const successResult = {
        success: true,
        paymentIntentId: paymentIntent?.id || 'unknown',
        amount,
        currency,
        customerEmail,
        customerName
      };
      
      onPaymentSuccess?.(successResult);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      onPaymentError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while Stripe is initializing
  if (!stripe) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading payment system...</p>
            <p className="text-xs text-muted-foreground mt-2">Please wait while we initialize secure payment</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your payment of {currency} {amount.toLocaleString()}
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-green-800">
                Your payment has been processed successfully. You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-500" />
            Secure
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4 text-blue-500" />
            Encrypted
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Amount Selection */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Select Payment Amount</h3>
            <p className="text-sm text-muted-foreground">
              Choose the amount you'd like to pay towards your admission
            </p>
          </div>
          
          {/* Predefined Amounts */}
          <div className="grid grid-cols-2 gap-3">
            {predefinedAmounts.map((item) => (
              <Button 
                key={item.value}
                type="button"
                variant={amount === item.value ? "default" : "outline"}
                onClick={() => handleAmountChange(item.value)}
                className="h-16 flex flex-col"
              >
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
              </Button>
            ))}
          </div>

          {/* Custom Amount Section */}
          <div className="border-t pt-4">
            {!showCustomAmount ? (
              <Button 
                variant="outline" 
                onClick={() => setShowCustomAmount(true)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Enter Custom Amount
              </Button>
            ) : (
              <form onSubmit={handleCustomAmountSubmit} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="customAmount" className="text-sm font-medium">
                    Enter Custom Amount ({currency})
                  </Label>
                  <Input
                    id="customAmount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    step="1"
                    className="text-center text-lg font-semibold"
                    autoFocus
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter any amount you'd like to pay
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Set Custom Amount
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowCustomAmount(false);
                      setCustomAmount('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Selected Amount Display */}
        <div className="text-center p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Amount to Pay</p>
          <p className="text-2xl font-bold text-primary">
            {currency} {amount.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            For: {customerName} • {description}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="w-4 h-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Element */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-white min-h-[200px]">
              <PaymentElement 
                options={{
                  layout: 'tabs',
                  fields: {
                    billingDetails: {
                      name: 'never',
                      email: 'never',
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              By confirming your payment, you allow BIPS Technical College to charge you for this 
              payment and future payments in accordance with their terms.
            </p>
            <div className="flex items-center justify-between pt-2 border-t">
              <span>Powered by <strong>Stripe</strong></span>
              <div className="flex gap-4">
                <button type="button" className="hover:text-primary transition-colors">Terms</button>
                <button type="button" className="hover:text-primary transition-colors">Privacy</button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={!stripe || isLoading || amount <= 0} 
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ${currency} ${amount.toLocaleString()}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
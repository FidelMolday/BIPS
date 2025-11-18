import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle, Shield, Lock } from 'lucide-react';
import { PaymentResult } from '@/integrations/stripe/types';
import { mockCreatePaymentIntent } from '@/integrations/stripe/client';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onPaymentSuccess?: (result: PaymentResult) => void;
  onPaymentError?: (error: string) => void;
}

export const PaymentForm = ({ 
  amount, 
  currency = 'KES', 
  onPaymentSuccess,
  onPaymentError 
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingIntent, setIsCreatingIntent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        setIsCreatingIntent(true);
        const { clientSecret } = await mockCreatePaymentIntent(amount, currency);
        setClientSecret(clientSecret);
      } catch (err) {
        setError('Failed to initialize payment');
        onPaymentError?.('Failed to initialize payment');
      } finally {
        setIsCreatingIntent(false);
      }
    };

    initializePayment();
  }, [amount, currency, onPaymentError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'An error occurred');
        onPaymentError?.(submitError.message || 'An error occurred');
        setIsLoading(false);
        return;
      }

      // For demo purposes, we'll simulate a successful payment
      // In production, you would use stripe.confirmPayment()
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setPaymentSuccess(true);
      const successResult: PaymentResult = {
        success: true,
        paymentIntentId: `pi_demo_${Date.now()}`,
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
                Your admission process is now complete. You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isCreatingIntent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Initializing payment...</p>
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
        {/* Amount Display */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            {currency} {amount.toLocaleString()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Element */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-white">
              {clientSecret ? (
                <PaymentElement 
                  options={{
                    layout: 'tabs',
                    fields: {
                      billingDetails: {
                        name: 'auto',
                        email: 'auto',
                        address: 'auto',
                      }
                    }
                  }}
                />
              ) : (
                <div className="text-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Loading payment form...</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
            disabled={!stripe || isLoading || !clientSecret} 
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
import { useState, useEffect, FormEvent } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle, Shield, Lock, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: string) => void;
}

// Backend API base URL
const API_BASE_URL = 'https://stripe-test-yb9k.onrender.com/api';

export const PaymentForm = ({ 
  amount, 
  currency = 'KES', 
  customerEmail = 'student@bips.com', // Default values
  customerName = 'BIPS Student',
  description = 'Course Registration Fee',
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

  // Create payment intent using your backend
  const createPaymentIntent = async (amount: number, currency: string) => {
    try {
      console.log('Creating payment intent for amount:', amount);
      
      const response = await fetch(`${API_BASE_URL}/payments/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: currency.toLowerCase(),
          customerEmail,
          customerName,
          description,
          metadata: {
            source: 'bips-website',
            course: description
          }
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Payment intent created successfully:', data.paymentIntentId);
      return data;
    } catch (error) {
      console.error('Payment intent creation error:', error);
      // More specific error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to payment server. Please check your internet connection and try again.');
      }
      throw error;
    }
  };

  useEffect(() => {
    const initializePayment = async () => {
      try {
        setIsCreatingIntent(true);
        setError(null);
        
        const result = await createPaymentIntent(amount, currency);
        setClientSecret(result.clientSecret);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize payment';
        console.error('Initialization error:', errorMessage);
        setError(errorMessage);
        onPaymentError?.(errorMessage);
      } finally {
        setIsCreatingIntent(false);
      }
    };

    // Only initialize if we have an amount
    if (amount > 0) {
      initializePayment();
    } else {
      setError('Please select a valid payment amount');
      setIsCreatingIntent(false);
    }
  }, [amount, currency, customerEmail, customerName, description, onPaymentError]);

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

  if (isCreatingIntent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Initializing secure payment...</p>
            <p className="text-xs text-muted-foreground mt-2">Connecting to payment gateway</p>
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
          <p className="text-xs text-muted-foreground mt-1">
            For: {customerName}
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
            <div className="border rounded-lg p-4 bg-white">
              {clientSecret ? (
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
              ) : (
                <div className="text-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Loading payment form...</p>
                </div>
              )}
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
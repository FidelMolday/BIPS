import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, CheckCircle, Shield, Lock } from 'lucide-react';

interface SimpleCardFormProps {
  amount: number;
  currency?: string;
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: string) => void;
}

export const SimpleCardForm = ({ 
  amount, 
  currency = 'KES', 
  onPaymentSuccess,
  onPaymentError 
}: SimpleCardFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    country: 'Kenya'
  });

  const handleInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches ? matches[0] : '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    if (cleaned.length >= 3) {
      return cleaned.slice(0, 2) + ' / ' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Basic validation
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
      setError('Please fill in all card details');
      return;
    }

    if (cardDetails.number.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll simulate a successful payment
      // In production, this would call your Stripe backend
      setPaymentSuccess(true);
      const successResult = {
        success: true,
        paymentIntentId: `pi_demo_${Date.now()}`,
        amount: amount,
        currency: currency
      };
      onPaymentSuccess?.(successResult);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card information</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 1234 1234 1234"
              value={cardDetails.number}
              onChange={(e) => handleInputChange('number', formatCardNumber(e.target.value))}
              maxLength={19}
              className="w-full"
            />
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">MM / YY</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM / YY"
                value={cardDetails.expiry}
                onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
                maxLength={7}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                type="text"
                placeholder="CVC"
                value={cardDetails.cvc}
                onChange={(e) => handleInputChange('cvc', e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={4}
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Candidate name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Full name on card"
              value={cardDetails.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country or region</Label>
            <Input
              id="country"
              type="text"
              value={cardDetails.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
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
            disabled={isLoading} 
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
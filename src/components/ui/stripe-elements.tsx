import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Use your actual publishable key
const stripePromise = loadStripe('pk_test_51SUuhcK2mbZGHZrKEZMX2cmHYKHCDS1NRuA7hS5xcLpjOfsrFYv01aIcWaqMuL7whZFYpJsgk7sB9n0Zb2UsNLd40082NqLupW');

interface StripeElementsProps {
  children: ReactNode;
  clientSecret?: string;
}

export const StripeElements = ({ children, clientSecret }: StripeElementsProps) => {
  const options = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#0066cc',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  } : undefined;

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
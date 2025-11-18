import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/integrations/stripe/client';
import { ReactNode } from 'react';

interface StripeElementsProps {
  children: ReactNode;
  clientSecret?: string;
}

export const StripeElements = ({ children, clientSecret }: StripeElementsProps) => {
  const stripePromise = getStripe();

  const options = {
    clientSecret,
    appearance: {
      theme: 'flat' as const,
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#dc2626',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
        fontSizeBase: '16px',
      },
      rules: {
        '.Input': {
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '16px',
        },
        '.Input:focus': {
          borderColor: '#2563eb',
          boxShadow: '0 0 0 1px #2563eb',
        },
        '.Label': {
          fontWeight: '500',
          marginBottom: '8px',
          color: '#374151',
        },
        '.Tab': {
          border: '1px solid #d1d5db',
          borderRadius: '8px',
        },
        '.Tab--selected': {
          borderColor: '#2563eb',
          backgroundColor: '#f8fafc',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
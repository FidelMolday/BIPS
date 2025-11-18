import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Mock function for development - replace with actual API call
export const createPaymentIntent = async (amount: number, currency: string = 'kes') => {
  // For now, we'll return a mock client secret
  // In production, this should call your backend API
  return {
    clientSecret: `pi_mock_${Date.now()}_secret_mock_${Math.random().toString(36).substr(2, 9)}`,
    amount: Math.round(amount * 100),
    currency: currency.toLowerCase(),
  };
};

// Mock function to simulate backend API call
export const mockCreatePaymentIntent = async (amount: number, currency: string = 'kes') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    clientSecret: `pi_mock_${Date.now()}_secret_mock_${Math.random().toString(36).substr(2, 9)}`,
    amount: Math.round(amount * 100),
    currency: currency.toLowerCase(),
    id: `pi_mock_${Date.now()}`,
  };
};
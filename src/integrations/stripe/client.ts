import { loadStripe, Stripe } from '@stripe/stripe-js';
 pundit
import { supabase } from '@/integrations/supabase/client';

 main

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

 pundit
export const createPaymentIntent = async (amount: number, currency: string = 'kes', metadata?: any) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: {
        amount,
        currency,
        metadata
      }
    });

    if (error) {
      throw new Error(error.message || 'Failed to create payment intent');
    }

    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Helper function to format amount for display
export const formatAmount = (amount: number, currency: string = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);

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
 main
};
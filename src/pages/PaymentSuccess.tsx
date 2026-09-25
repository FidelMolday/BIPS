import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  XCircle,
  Loader2,
  Home,
  Printer,
  Receipt,
  AlertCircle,
} from 'lucide-react';

const API_BASE = 'https://paystack-5vql.onrender.com';

type VerifyStatus = 'loading' | 'success' | 'failed' | 'error';

interface VerifiedData {
  reference?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  paidAt?: string;
  customer?: { name?: string; email?: string; phone?: string };
  summary?: {
    amountPaid?: string;
    transactionFee?: string;
    netAmount?: string;
    paymentDate?: string;
  };
  receiptNumber?: string;
  [key: string]: unknown;
}

const Row = ({
  label,
  value,
  bold,
  mono,
}: {
  label: string;
  value: string;
  bold?: boolean;
  mono?: boolean;
}) => (
  <div className="flex justify-between items-start gap-4 border-b last:border-b-0 pb-2 last:pb-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span
      className={`text-sm text-right break-all ${
        bold ? 'font-bold' : 'font-medium'
      } ${mono ? 'font-mono text-xs' : ''}`}
    >
      {value}
    </span>
  </div>
);

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const reference = params.get('reference');
  const invoiceId = sessionStorage.getItem('paystack_invoice_id');

  const [status, setStatus] = useState<VerifyStatus>('loading');
  const [data, setData] = useState<VerifiedData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setStatus('error');
      setErrorMsg('No payment reference found in the URL.');
      return;
    }

    const verify = async () => {
      try {
        const endpoint = invoiceId
          ? `${API_BASE}/api/invoices/${invoiceId}`
          : `${API_BASE}/api/donations/verify/${reference}`;

        const res = await fetch(endpoint);
        const result = await res.json();

        if (!res.ok || !result.success) {
          setStatus('failed');
          setErrorMsg(result.message || 'Payment could not be verified.');
          return;
        }

        if (result.data?.formatted) {
          const f = result.data.formatted;
          setData({
            reference: f.reference,
            amount: f.amount,
            currency: f.currency,
            paymentMethod: f.paymentMethod,
            paidAt: f.paidAt,
            customer: f.customer,
            summary: f.summary,
            receiptNumber: f.receiptNumber,
          });
        } else {
          setData({
            reference,
            amount: result.data?.totalAmount,
            currency: 'KES',
            customer: { name: result.data?.sponsorId?.name },
          });
        }

        setStatus('success');
        sessionStorage.removeItem('paystack_reference');
        sessionStorage.removeItem('paystack_invoice_id');
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
        setErrorMsg(
          'Could not verify payment. Please contact us if you were charged.'
        );
      }
    };

    verify();
  }, [reference, invoiceId]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow bg-muted/20 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {status === 'loading' && (
            <Card>
              <CardContent className="p-10 text-center">
                <Loader2 className="w-14 h-14 text-primary mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">Verifying Payment</h2>
                <p className="text-muted-foreground">
                  Please wait while we confirm your transaction with Paystack…
                </p>
              </CardContent>
            </Card>
          )}

          {status === 'success' && (
            <Card className="border-green-200">
              <CardContent className="p-10 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-3">Payment Successful</h1>
                <p className="text-muted-foreground mb-8">
                  Thank you! Your payment has been received and confirmed.
                </p>

                <div className="bg-gray-50 border rounded-lg p-6 text-left space-y-3 mb-8">
                  {data?.receiptNumber && (
                    <Row label="Receipt No." value={data.receiptNumber} />
                  )}
                  {data?.reference && (
                    <Row label="Reference" value={data.reference} mono />
                  )}
                  {data?.summary?.amountPaid && (
                    <Row
                      label="Amount Paid"
                      value={data.summary.amountPaid}
                      bold
                    />
                  )}
                  {data?.summary?.transactionFee && (
                    <Row
                      label="Transaction Fee"
                      value={data.summary.transactionFee}
                    />
                  )}
                  {data?.summary?.netAmount && (
                    <Row label="Net Amount" value={data.summary.netAmount} />
                  )}
                  {data?.paymentMethod && (
                    <Row label="Method" value={data.paymentMethod} />
                  )}
                  {data?.customer?.name && (
                    <Row label="Customer" value={data.customer.name} />
                  )}
                  {data?.customer?.email && (
                    <Row label="Email" value={data.customer.email} />
                  )}
                  {data?.summary?.paymentDate && (
                    <Row label="Date" value={data.summary.paymentDate} />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handlePrint} variant="outline">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Receipt
                  </Button>
                  <Link to="/">
                    <Button>
                      <Home className="w-4 h-4 mr-2" />
                      Return Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {status === 'failed' && (
            <Card className="border-red-200">
              <CardContent className="p-10 text-center">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-3">Payment Failed</h1>
                <p className="text-muted-foreground mb-6">
                  {errorMsg || 'Your payment could not be completed.'}
                </p>
                <Link to="/">
                  <Button>Return Home</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {status === 'error' && (
            <Card className="border-yellow-200">
              <CardContent className="p-10 text-center">
                <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold mb-3">
                  We couldn't verify your payment
                </h1>
                <p className="text-muted-foreground mb-6">
                  {errorMsg ||
                    'If you were charged, please contact us with your reference.'}
                </p>
                {reference && (
                  <p className="text-xs text-muted-foreground mb-6 font-mono">
                    Ref: {reference}
                  </p>
                )}
                <Link to="/contact">
                  <Button>
                    <Receipt className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PaymentSuccess;
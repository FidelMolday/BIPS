import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Download, CreditCard, Banknote, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { StripeElements } from '@/components/ui/stripe-elements';
import { PaymentForm } from '@/components/PaymentForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState("documents");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful:', result);
    // You can add redirect or success message logic here
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // You can add error handling logic here
  };

  const handlePayOnlineClick = () => {
    setActiveTab("payment");
    setShowPaymentForm(false); // Reset to show amount selection first
  };

  // Create payment intent by calling backend API and return client secret
  const createPaymentIntent = async (paymentAmount: number) => {
    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentAmount,
          currency: 'kes',
          customerEmail: 'student@bips.com',
          customerName: 'BIPS Student',
          description: 'Course Registration Fee',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };

  const handleAmountSelect = (amount: number) => {
    setPaymentAmount(amount);
  };

  const handleProceedToPayment = async () => {
    try {
      const secret = await createPaymentIntent(paymentAmount);
      setClientSecret(secret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error('Failed to initialize payment:', error);
      // Optionally show an error to the user here
    }
  };

  const handleBackToAmountSelection = () => {
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
            <p className="text-xl text-white/90">Start your journey with BIPS Technical College</p>
          </div>
        </section>

        {/* Downloadable Documents & Payment */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Admission Process</h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="documents">Required Documents</TabsTrigger>
                <TabsTrigger value="payment">Make Payment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents">
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Download className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2">Application Letter Template</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            Download the application letter template to start your admission process.
                          </p>
                          <a href="/documents/application-form.pdf" download>
                            <Button variant="outline" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Download Application Letter
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Download className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2">Admission Letter Template</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            Download the admission letter template to complete your application process.
                          </p>
                          <a href="/documents/admission-letter-template.pdf" download>
                            <Button variant="outline" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Download Admission Letter
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Download className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2">Fee Structure 2024/2025</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            View the complete fee structure for all programs offered at BIPS.
                          </p>
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download Fee Structure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fee Payment Information */}
                <div className="max-w-4xl mx-auto">
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="bg-primary/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl">Fee Payment Details</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="font-bold text-lg mb-4">Equity Bank</h3>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                            <p className="font-semibold">Equity Bank</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                            <p className="font-semibold">Blessing Institute of Professional Studies</p>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> Contact the college for account number details.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-bold text-lg mb-4">Co-operative Bank</h3>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                            <p className="font-semibold">Co-operative Bank</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                            <p className="font-semibold">Blessing Institute of Professional Studies</p>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                            <p className="text-sm text-amber-800">
                              <strong>Note:</strong> Contact the college for account number details.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-bold mb-3 text-blue-900">Payment Instructions:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                          <li>Download and fill the admission letter</li>
                          <li>Review the fee structure for your program</li>
                          <li>Make payment using either bank deposit or online payment</li>
                          <li>Keep your payment receipt for verification</li>
                          <li>Submit the receipt along with your admission documents</li>
                        </ol>
                        
                        <div className="mt-4 text-center">
                          <Button 
                            onClick={handlePayOnlineClick}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Banknote className="w-4 h-4 mr-2" />
                            Pay Online Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="payment">
                <div className="max-w-2xl mx-auto">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        Secure Online Payment
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Pay your admission fees safely and securely
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {!showPaymentForm ? (
                        <>
                          <div className="text-center">
                            <h3 className="text-lg font-semibold mb-4">Select Payment Amount</h3>
                            <p className="text-muted-foreground mb-6">
                              Choose the amount you'd like to pay towards your admission
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                            <Button 
                              variant={paymentAmount === 5000 ? "default" : "outline"}
                              onClick={() => handleAmountSelect(5000)}
                              className="h-16"
                            >
                              <div>
                                <div className="font-semibold">KES 5,000</div>
                                <div className="text-xs text-muted-foreground">Application Fee</div>
                              </div>
                            </Button>
                            <Button 
                              variant={paymentAmount === 10000 ? "default" : "outline"}
                              onClick={() => handleAmountSelect(10000)}
                              className="h-16"
                            >
                              <div>
                                <div className="font-semibold">KES 10,000</div>
                                <div className="text-xs text-muted-foreground">Deposit</div>
                              </div>
                            </Button>
                            <Button 
                              variant={paymentAmount === 25000 ? "default" : "outline"}
                              onClick={() => handleAmountSelect(25000)}
                              className="h-16"
                            >
                              <div>
                                <div className="font-semibold">KES 25,000</div>
                                <div className="text-xs text-muted-foreground">1st Semester</div>
                              </div>
                            </Button>
                            <Button 
                              variant={paymentAmount === 50000 ? "default" : "outline"}
                              onClick={() => handleAmountSelect(50000)}
                              className="h-16"
                            >
                              <div>
                                <div className="font-semibold">KES 50,000</div>
                                <div className="text-xs text-muted-foreground">Full Year</div>
                              </div>
                            </Button>
                          </div>

                          {paymentAmount > 0 && (
                            <div className="text-center pt-4 space-y-4">
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="font-semibold text-blue-900">
                                  Selected Amount: KES {paymentAmount.toLocaleString()}
                                </p>
                              </div>
                              <Button 
                                onClick={handleProceedToPayment}
                                className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
                                size="lg"
                              >
                                <CreditCard className="w-5 h-5 mr-2" />
                                Pay KES {paymentAmount.toLocaleString()}
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="space-y-4">
                            <Button
                              variant="outline"
                              onClick={handleBackToAmountSelection}
                              className="mb-4"
                            >
                              ← Back to Amount Selection
                            </Button>
                            {clientSecret ? (
                              <StripeElements clientSecret={clientSecret}>
                                <PaymentForm
                                  amount={paymentAmount}
                                  currency="KES"
                                  onPaymentSuccess={handlePaymentSuccess}
                                  onPaymentError={handlePaymentError}
                                  onClientSecret={setClientSecret}
                                />
                              </StripeElements>
                            ) : (
                              <Card>
                                <CardContent className="pt-6">
                                  <div className="text-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                                    <p className="text-muted-foreground">Initializing payment...</p>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Admissions;
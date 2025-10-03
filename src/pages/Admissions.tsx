import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Download, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Admissions = () => {
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

        {/* Downloadable Documents */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Download Required Documents</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
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
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Admission Letter
                      </Button>
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
                      <h3 className="font-bold text-lg mb-4">Bank Details</h3>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                        <p className="font-semibold">Kenya Commercial Bank (KCB)</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                        <p className="font-semibold">BIPS Technical College</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                        <p className="font-semibold">1234567890</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Branch</p>
                        <p className="font-semibold">Nairobi Branch</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg mb-4">M-PESA Paybill</h3>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Paybill Number</p>
                        <p className="font-semibold text-2xl text-primary">522522</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                        <p className="font-semibold">Your Admission Number</p>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                        <p className="text-sm text-amber-800">
                          <strong>Note:</strong> Please use your admission number as the account number when making M-PESA payments.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-bold mb-3 text-blue-900">Payment Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                      <li>Download and fill the admission letter</li>
                      <li>Review the fee structure for your program</li>
                      <li>Make payment using either bank deposit or M-PESA</li>
                      <li>Keep your payment receipt for verification</li>
                      <li>Submit the receipt along with your admission documents</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Admissions;

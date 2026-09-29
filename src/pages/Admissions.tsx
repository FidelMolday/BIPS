import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import {
  Download,
  CreditCard,
  Banknote,
  Loader2,
  Users,
  UserPlus,
  Trash2,
  FileText,
  Phone,
  Mail,
  Building2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useState } from 'react';
import { PaystackPayment } from '@/components/PaystackPayment';

type Student = {
  fullName: string;
  course: string;
  semester: string;
  tuitionFee: string;
  registrationFee: string;
};

type Sponsor = {
  name: string;
  contactPerson: string;
  phone: string;
  notes: string;
};

type Invoice = {
  _id: string;
  invoiceNumber: string;
  totalAmount: number;
  sponsorId?: {
    name?: string;
    phone?: string;
  };
};

const API_BASE = 'https://paystack-5vql.onrender.com';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [paymentAmount, setPaymentAmount] = useState<number>(5000);

  const [sponsor, setSponsor] = useState<Sponsor>({
    name: '',
    contactPerson: '',
    phone: '',
    notes: '',
  });

  const [students, setStudents] = useState<Student[]>([
    {
      fullName: '',
      course: '',
      semester: 'First',
      tuitionFee: '',
      registrationFee: '',
    },
  ]);

  const [processingEnrollment, setProcessingEnrollment] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<string | null>(
    null
  );
  const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(
    null
  );
  const [showInvoicePayment, setShowInvoicePayment] = useState(false);

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment recorded successfully:', result);

    alert(
      `Payment recorded successfully! Transaction ID: ${
        result?.transactionId || result?.reference || 'N/A'
      }`
    );
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);

    alert(`Payment error: ${error}`);

    if (
      error?.toLowerCase().includes('network') ||
      error?.toLowerCase().includes('fetch')
    ) {
      console.error('Network error - check internet connection');
    }
  };

  const handlePayOnlineClick = () => {
    setActiveTab('payment');

    setTimeout(() => {
      const paymentSection = document.getElementById('payment-section');

      if (paymentSection) {
        paymentSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const handleAmountChange = (amount: number) => {
    setPaymentAmount(amount);
    console.log('Payment amount updated:', amount);
  };

  const addStudent = () => {
    setStudents([
      ...students,
      {
        fullName: '',
        course: '',
        semester: 'First',
        tuitionFee: '',
        registrationFee: '',
      },
    ]);
  };

  const removeStudent = (index: number) => {
    if (students.length <= 1) return;

    setStudents(students.filter((_, studentIndex) => studentIndex !== index));
  };

  const updateStudent = (
    index: number,
    field: keyof Student,
    value: string
  ) => {
    const updatedStudents = [...students];

    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value,
    };

    setStudents(updatedStudents);
  };

  const handleBulkEnrollment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setProcessingEnrollment(true);
    setEnrollmentError(null);
    setEnrollmentSuccess(null);
    setShowInvoicePayment(false);
    setGeneratedInvoice(null);

    try {
      if (!sponsor.name || !sponsor.contactPerson || !sponsor.phone) {
        throw new Error(
          'Please fill in all required sponsor information'
        );
      }

      for (const student of students) {
        if (!student.fullName || !student.course) {
          throw new Error(
            'Please fill in all required student information'
          );
        }
      }

      let sponsorId: string;

      try {
        const sponsorResponse = await fetch(`${API_BASE}/api/sponsors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sponsor.name,
            contactPerson: sponsor.contactPerson,
            phone: sponsor.phone,
            notes: sponsor.notes,
          }),
        });

        const sponsorResult = await sponsorResponse.json();

        if (sponsorResult.success) {
          sponsorId = sponsorResult.data._id;
        } else if (
          sponsorResult.message &&
          sponsorResult.message.includes('already exists')
        ) {
          const existingResponse = await fetch(
            `${API_BASE}/api/sponsors?phone=${encodeURIComponent(
              sponsor.phone
            )}`
          );

          const existingResult = await existingResponse.json();

          if (
            existingResult.success &&
            Array.isArray(existingResult.data) &&
            existingResult.data.length > 0
          ) {
            sponsorId = existingResult.data[0]._id;
            console.log('Using existing sponsor:', sponsorId);
          } else {
            throw new Error(
              'Sponsor already exists but could not be found'
            );
          }
        } else {
          throw new Error(
            sponsorResult.message || 'Failed to create sponsor'
          );
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);

        if (!message.includes('already exists')) {
          throw error;
        }

        const existingResponse = await fetch(
          `${API_BASE}/api/sponsors?phone=${encodeURIComponent(
            sponsor.phone
          )}`
        );

        const existingResult = await existingResponse.json();

        if (
          existingResult.success &&
          Array.isArray(existingResult.data) &&
          existingResult.data.length > 0
        ) {
          sponsorId = existingResult.data[0]._id;
        } else {
          throw new Error(
            'Sponsor already exists but could not be found'
          );
        }
      }

      const batchResponse = await fetch(`${API_BASE}/api/batches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sponsorId,
          students: students.map((student) => ({
            ...student,
            tuitionFee: parseFloat(student.tuitionFee) || 0,
            registrationFee:
              parseFloat(student.registrationFee) || 0,
          })),
        }),
      });

      const batchResult = await batchResponse.json();

      if (!batchResult.success) {
        throw new Error(
          batchResult.message || 'Failed to create batch registration'
        );
      }

      const processResponse = await fetch(
        `${API_BASE}/api/batches/${batchResult.data._id}/process`,
        {
          method: 'POST',
        }
      );

      const processResult = await processResponse.json();

      if (!processResult.success) {
        throw new Error(
          processResult.message || 'Failed to process batch'
        );
      }

      const invoice = processResult.data.invoice as Invoice;

      setEnrollmentSuccess(
        `Batch enrollment successful! Invoice created: ${
          invoice.invoiceNumber
        }. Total amount: KES ${invoice.totalAmount.toLocaleString()}`
      );

      setGeneratedInvoice(invoice);
      setShowInvoicePayment(true);

      setTimeout(() => {
        const paymentSection = document.getElementById(
          'bulk-payment-section'
        );

        if (paymentSection) {
          paymentSection.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }, 500);
    } catch (error) {
      console.error('Enrollment error:', error);

      setEnrollmentError(
        error instanceof Error
          ? error.message
          : 'Error processing enrollment. Please try again.'
      );
    } finally {
      setProcessingEnrollment(false);
    }
  };

  const handleInvoicePaymentSuccess = (result: any) => {
    console.log('Invoice payment successful:', result);

    alert(
      `Invoice payment recorded successfully! Transaction ID: ${
        result?.transactionId || result?.reference || 'N/A'
      }`
    );

    setShowInvoicePayment(false);
    setGeneratedInvoice(null);

    setSponsor({
      name: '',
      contactPerson: '',
      phone: '',
      notes: '',
    });

    setStudents([
      {
        fullName: '',
        course: '',
        semester: 'First',
        tuitionFee: '',
        registrationFee: '',
      },
    ]);
  };

  const handleInvoicePaymentError = (error: string) => {
    console.error('Invoice payment error:', error);
    alert(`Invoice payment error: ${error}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admissions
            </h1>

            <p className="text-xl text-white/90">
              Start your journey with BIPS Technical College
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Admission Process
            </h2>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="max-w-6xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="documents">
                  Required Documents
                </TabsTrigger>

                <TabsTrigger value="payment">
                  Individual Payment
                </TabsTrigger>

                <TabsTrigger value="bulk-enrollment">
                  Bulk Enrollment
                </TabsTrigger>
              </TabsList>

              {/* DOCUMENTS */}
              <TabsContent value="documents">
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Download className="w-6 h-6 text-primary" />
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2">
                            Application Letter Template
                          </h3>

                          <p className="text-muted-foreground text-sm mb-4">
                            Download the application letter template to
                            start your admission process.
                          </p>

                          <a
                            href="/documents/application-form.pdf"
                            download
                          >
                            <Button
                              variant="outline"
                              className="w-full"
                            >
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
                          <FileText className="w-6 h-6 text-primary" />
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2">
                            Admission Letter Template
                          </h3>

                          <p className="text-muted-foreground text-sm mb-4">
                            Download the admission letter template to
                            complete your application process.
                          </p>

                          <a
                            href="/documents/admission-letter-template.pdf"
                            download
                          >
                            <Button
                              variant="outline"
                              className="w-full"
                            >
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
                          <h3 className="font-bold text-lg mb-2">
                            Fee Structure 2026/2027
                          </h3>

                          <p className="text-muted-foreground text-sm mb-4">
                            View the complete fee structure for all
                            programs offered at BIPS.
                          </p>

                          <a
                            href="/documents/fee-structure.pdf"
                            download
                          >
                            <Button
                              variant="outline"
                              className="w-full"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Fee Structure
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* PAYMENT OPTIONS */}
                <div className="max-w-4xl mx-auto">
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="bg-primary/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>

                        <CardTitle className="text-2xl">
                          Fee Payment Options
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                          <h3 className="font-bold text-lg mb-4">
                            Bank Transfer
                          </h3>

                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Equity Bank
                            </p>

                            <p className="font-semibold">
                              Blessing Institute of Professional Studies
                            </p>

                            <p className="text-xs text-muted-foreground mt-1">
                              Contact college for account number
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Co-operative Bank
                            </p>

                            <p className="font-semibold">
                              Blessing Institute of Professional Studies
                            </p>

                            <p className="text-xs text-muted-foreground mt-1">
                              Contact college for account number
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-bold text-lg mb-4">
                            Online Payment
                          </h3>

                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm text-green-800 mb-2">
                              <strong>Instant & Secure</strong>
                            </p>

                            <p className="text-xs text-green-700">
                              Pay online using card, mobile money, or
                              bank transfer through our secure Paystack
                              integration.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Secure SSL Encryption
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Multiple Payment Methods
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-bold mb-3 text-blue-900">
                          Payment Instructions:
                        </h4>

                        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                          <li>
                            Choose your preferred payment method above
                          </li>

                          <li>
                            For online payment: Click "Make Payment"
                            below
                          </li>

                          <li>
                            For bank transfer: Record payment details
                            first, then make transfer
                          </li>

                          <li>
                            Keep your payment receipt for verification
                          </li>

                          <li>
                            Submit the receipt along with your admission
                            documents
                          </li>
                        </ol>

                        <div className="mt-6 text-center">
                          <Button
                            onClick={handlePayOnlineClick}
                            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                            size="lg"
                          >
                            <Banknote className="w-5 h-5 mr-2" />
                            Make Payment Online
                          </Button>

                          <p className="text-sm text-muted-foreground mt-3">
                            Secure online payment via Paystack
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* INDIVIDUAL PAYMENT */}
              <TabsContent value="payment">
                <div
                  id="payment-section"
                  className="max-w-2xl mx-auto"
                >
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                        <CreditCard className="w-6 h-6" />
                        Make Payment
                      </CardTitle>

                      <p className="text-muted-foreground">
                        Choose online payment or record bank transfer
                        details
                      </p>
                    </CardHeader>

                    <CardContent className="p-6">
                      <PaystackPayment
                        amount={paymentAmount}
                        currency="KES"
                        customerEmail=""
                        customerName=""
                        description="Course Registration Fee"
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                        onAmountChange={handleAmountChange}
                      />
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-3">
                        Need Help?
                      </h4>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          • For payment issues, contact:
                          finance@bips.com
                        </p>

                        <p>
                          • For admission queries, contact:
                          admissions@bips.com
                        </p>

                        <p>
                          • College phone: +254 XXX XXX XXX
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* BULK ENROLLMENT */}
              <TabsContent value="bulk-enrollment">
                <div className="max-w-4xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Users className="w-6 h-6" />
                        Sponsor/Agent Bulk Enrollment
                      </CardTitle>

                      <p className="text-muted-foreground">
                        Register multiple students under one sponsor
                        with consolidated invoicing
                      </p>
                    </CardHeader>

                    <CardContent>
                      {enrollmentSuccess && (
                        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />

                            <p className="text-green-800">
                              {enrollmentSuccess}
                            </p>
                          </div>
                        </div>
                      )}

                      {enrollmentError && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />

                            <p className="text-red-800">
                              {enrollmentError}
                            </p>
                          </div>
                        </div>
                      )}

                      {showInvoicePayment && generatedInvoice ? (
                        <div
                          id="bulk-payment-section"
                          className="space-y-6"
                        >
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-6 h-6" />
                                Pay Generated Invoice
                              </CardTitle>

                              <p className="text-muted-foreground">
                                Pay the invoice for your batch
                                enrollment:{' '}
                                <strong>
                                  {generatedInvoice.invoiceNumber}
                                </strong>
                              </p>
                            </CardHeader>

                            <CardContent>
                              <PaystackPayment
                                amount={generatedInvoice.totalAmount}
                                currency="KES"
                                paymentType="invoice"
                                invoiceId={generatedInvoice._id}
                                invoiceNumber={
                                  generatedInvoice.invoiceNumber
                                }
                                sponsorName={
                                  generatedInvoice.sponsorId?.name ||
                                  sponsor.name
                                }
                                customerEmail={
                                  generatedInvoice.sponsorId?.phone ||
                                  sponsor.phone
                                }
                                customerPhone={sponsor.phone}
                                customerName={sponsor.contactPerson}
                                onPaymentSuccess={
                                  handleInvoicePaymentSuccess
                                }
                                onPaymentError={
                                  handleInvoicePaymentError
                                }
                              />
                            </CardContent>
                          </Card>

                          <div className="mt-4 text-center">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowInvoicePayment(false);
                                setGeneratedInvoice(null);
                              }}
                            >
                              Back to Enrollment Form
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleBulkEnrollment}
                          className="space-y-6"
                        >
                          {/* SPONSOR */}
                          <div className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-blue-50">
                            <h4 className="md:col-span-2 font-semibold text-blue-900 flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              Sponsor Information
                            </h4>

                            <div>
                              <Label
                                htmlFor="sponsorName"
                                className="text-sm"
                              >
                                Organization/Agent Name *
                              </Label>

                              <Input
                                id="sponsorName"
                                value={sponsor.name}
                                onChange={(event) =>
                                  setSponsor({
                                    ...sponsor,
                                    name: event.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="contactPerson"
                                className="text-sm"
                              >
                                Contact Person *
                              </Label>

                              <Input
                                id="contactPerson"
                                value={sponsor.contactPerson}
                                onChange={(event) =>
                                  setSponsor({
                                    ...sponsor,
                                    contactPerson:
                                      event.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div>
                              <Label
                                htmlFor="sponsorPhone"
                                className="text-sm"
                              >
                                Phone *
                              </Label>

                              <Input
                                id="sponsorPhone"
                                type="tel"
                                value={sponsor.phone}
                                onChange={(event) =>
                                  setSponsor({
                                    ...sponsor,
                                    phone: event.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="md:col-span-2">
                              <Label
                                htmlFor="sponsorNotes"
                                className="text-sm"
                              >
                                Notes
                              </Label>

                              <Textarea
                                id="sponsorNotes"
                                value={sponsor.notes}
                                onChange={(event) =>
                                  setSponsor({
                                    ...sponsor,
                                    notes: event.target.value,
                                  })
                                }
                                placeholder="Additional information about the sponsor..."
                              />
                            </div>
                          </div>

                          {/* STUDENTS */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Student Information ({students.length}{' '}
                                students)
                              </h4>

                              <Button
                                type="button"
                                onClick={addStudent}
                                variant="outline"
                                size="sm"
                              >
                                <UserPlus className="w-4 h-4 mr-1" />
                                Add Student
                              </Button>
                            </div>

                            {students.map((student, index) => (
                              <div
                                key={index}
                                className="p-4 border rounded-lg space-y-3"
                              >
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium">
                                    Student {index + 1}
                                  </h5>

                                  {students.length > 1 && (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        removeStudent(index)
                                      }
                                      variant="ghost"
                                      size="sm"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-3">
                                  <div>
                                    <Label className="text-sm">
                                      Full Name *
                                    </Label>

                                    <Input
                                      value={student.fullName}
                                      onChange={(event) =>
                                        updateStudent(
                                          index,
                                          'fullName',
                                          event.target.value
                                        )
                                      }
                                      required
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Course *
                                    </Label>

                                    <Input
                                      value={student.course}
                                      onChange={(event) =>
                                        updateStudent(
                                          index,
                                          'course',
                                          event.target.value
                                        )
                                      }
                                      required
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Semester *
                                    </Label>

                                    <Input
                                      value={student.semester}
                                      onChange={(event) =>
                                        updateStudent(
                                          index,
                                          'semester',
                                          event.target.value
                                        )
                                      }
                                      required
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Tuition Fee (KES)
                                    </Label>

                                    <Input
                                      type="number"
                                      min="0"
                                      value={student.tuitionFee}
                                      onChange={(event) =>
                                        updateStudent(
                                          index,
                                          'tuitionFee',
                                          event.target.value
                                        )
                                      }
                                      placeholder="0"
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm">
                                      Registration Fee (KES)
                                    </Label>

                                    <Input
                                      type="number"
                                      min="0"
                                      value={student.registrationFee}
                                      onChange={(event) =>
                                        updateStudent(
                                          index,
                                          'registrationFee',
                                          event.target.value
                                        )
                                      }
                                      placeholder="0"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="submit"
                            disabled={processingEnrollment}
                            className="w-full"
                            size="lg"
                          >
                            {processingEnrollment ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Processing Enrollment...
                              </>
                            ) : (
                              <>
                                Submit Batch Enrollment (
                                {students.length} student
                                {students.length !== 1 ? 's' : ''})
                              </>
                            )}
                          </Button>
                        </form>
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
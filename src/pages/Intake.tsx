import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, Phone } from 'lucide-react';

const Intake = () => {
  const intakePeriods = [
    {
      title: 'January Intake',
      startDate: 'January 15, 2025',
      deadline: 'December 31, 2024',
      status: 'Open',
    },
    {
      title: 'May Intake',
      startDate: 'May 12, 2025',
      deadline: 'April 30, 2025',
      status: 'Coming Soon',
    },
    {
      title: 'September Intake',
      startDate: 'September 8, 2025',
      deadline: 'August 31, 2025',
      status: 'Coming Soon',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-background">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Intake Periods</h1>
            <p className="text-lg opacity-90">Join us at the start of our next academic term</p>
          </div>
        </section>

        {/* Current Intake Banner */}
        <section className="py-8 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">🎓 INTAKE ONGOING!</h2>
            <p className="text-lg">Applications are now open. Secure your spot today!</p>
          </div>
        </section>

        {/* Intake Periods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Intake Periods</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {intakePeriods.map((intake, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {intake.title}
                      <span className={`text-sm px-3 py-1 rounded ${
                        intake.status === 'Open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {intake.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Start Date</p>
                        <p className="text-sm text-muted-foreground">{intake.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Application Deadline</p>
                        <p className="text-sm text-muted-foreground">{intake.deadline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* How to Apply */}
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  How to Apply
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-3">
                  <li className="text-lg">Download and fill out the application form</li>
                  <li className="text-lg">Gather required documents (ID, certificates, etc.)</li>
                  <li className="text-lg">Submit your application at our campus or via email</li>
                  <li className="text-lg">Wait for confirmation and further instructions</li>
                </ol>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button size="lg" className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Download Application Form
                  </Button>
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Admissions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-lg mb-4">Contact our admissions team for assistance</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <p className="text-lg font-semibold">📞 0707 717 780 / 0704 094 393</p>
                <p className="text-lg font-semibold">✉️ admissions@institution.ac.ke</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Intake;

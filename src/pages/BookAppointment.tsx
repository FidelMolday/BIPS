import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Calendar, Clock, Phone, Mail, CheckCircle2, FileText, MapPin, Video, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const BookAppointment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    meetingType: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.meetingType) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-appointment-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Appointment Requested!',
        description: "We'll contact you within 24-48 hours to confirm.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        meetingType: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending appointment request:', error);
      toast({
        title: 'Error',
        description: 'Failed to send request. Please try again or call us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
            <p className="text-xl text-white/90 mb-4">
              Schedule a visit to our campus or a virtual meeting with our admissions team
            </p>
            <p className="inline-block bg-black/20 text-sm px-4 py-2 rounded">
              <Mail className="w-4 h-4 inline mr-2" />
              Appointment requests are sent to: blessinginstitute84@gmail.com
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* ===== Form ===== */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-2">Appointment Details</h2>
                    <p className="text-muted-foreground mb-2">
                      Fill in your details to schedule an appointment. Your request will be sent via email.
                    </p>
                    <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-3 mb-6">
                      This helps us prepare for our meeting with you
                    </p>

                    <h3 className="text-lg font-semibold mb-4">Appointment Information</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name *</label>
                          <Input
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number *</label>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                          <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Preferred Time</label>
                          <Input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Meeting Type *</label>
                          <select
                            name="meetingType"
                            value={formData.meetingType}
                            onChange={handleChange}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">-- Select an option --</option>
                            <option value="On-Campus Visit">On-Campus Visit</option>
                            <option value="Virtual Meeting (Zoom/Google Meet)">
                              Virtual Meeting (Zoom/Google Meet)
                            </option>
                            <option value="Phone Consultation">Phone Consultation</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Message / Questions</label>
                        <Textarea
                          name="message"
                          placeholder="Let us know what you'd like to discuss..."
                          className="min-h-[130px]"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Sending...' : 'Request Appointment'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* ===== Sidebar ===== */}
              <aside className="space-y-6">
                {/* Meeting Options */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Meeting Options</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> On-Campus Visit
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> Virtual Meeting (Zoom/Google Meet)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> Phone Consultation
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* What to Bring */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">What to Bring / Prepare</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      <li>Academic certificates (if applying)</li>
                      <li>ID/Passport copy</li>
                      <li>List of questions</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">Contact Information</h3>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      0707 717 780 / 0704 094 393
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 break-all">
                      <Mail className="w-4 h-4 text-primary" />
                      blessinginstitute84@gmail.com
                    </p>
                  </CardContent>
                </Card>

                {/* How It Works */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-primary">How It Works</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Fill out the appointment request form</li>
                      <li>Your request is sent to our team</li>
                      <li>We review your preferred date and time</li>
                      <li>We contact you within 24-48 hours to confirm</li>
                    </ol>
                  </CardContent>
                </Card>

                {/* Immediate Assistance */}
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h4 className="font-bold mb-1">Need Immediate Assistance?</h4>
                  <p className="text-xs text-muted-foreground">
                    For urgent inquiries, call us directly during working hours
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BookAppointment;
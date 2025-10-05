import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin } from 'lucide-react';

const AboutUs = () => {
  const leaders = [
    {
      name: "STEVE KAMWANZA",
      position: "PRINCIPAL",
      description: "Leading BIPS Technical College with a vision of excellence and innovation in technical education.",
      email: "principal@bipstc.ac.ke",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "KEVIN MBUGUA",
      position: "OPERATIONS MANAGER",
      description: "Oversees all operations ensuring quality education and smooth functioning across all departments.",
      email: "operations@bipstc.ac.ke",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      name: "MUKUHI KARIMI",
      position: "DIRECTOR",
      description: "Brings extensive expertise in strategic direction and ensuring the college meets its mission and goals.",
      email: "director@bipstc.ac.ke",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-white/90">Empowering the future through technical excellence</p>
          </div>
        </section>

        {/* Institution Description */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Blessing institute of professional studies (BIPS) is a registered institution under the Ministry of Higher Education, Technical Vocational and Education Training Chapter (TVET), business registration Act of the companies & Societies.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The college was started back in 2014 in Kangemi, Nairobi, with 6 students inside a salon. We have had over 1000 students since we opened and we have produced great professionals who are working in and out of the country. At BIPS, we equip our students with a great understanding on how to handle clients, workmates, service delivery in their work places and above all handling themselves decently.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We have enjoyed great growth both physically and academically thus we have expanded our classes. We have another branch in Kawangware along Naivasha road on cooperative bank building and still looking forward for the establishment of other branches in Kenya.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  The college is fully equipped with modern facilities that make it easy for our instructors to give the best to the students. We are one of the best leading colleges in Nairobi County as far as technical aspect is concerned.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
                      <p className="text-muted-foreground">Students Trained</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">2014</h3>
                      <p className="text-muted-foreground">Year Established</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">2</h3>
                      <p className="text-muted-foreground">Branches</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated leaders who guide BIPS Technical College towards excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {leaders.map((leader, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                    <p className="text-primary font-semibold mb-4">{leader.position}</p>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {leader.description}
                    </p>
                    <div className="flex items-center space-x-3 pt-4 border-t">
                      <a 
                        href={`mailto:${leader.email}`}
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </a>
                      <a 
                        href="#"
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
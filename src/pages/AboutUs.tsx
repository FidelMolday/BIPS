import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Linkedin } from 'lucide-react';

const AboutUs = () => {
  const leaders = [
    {
      name: "Dr. James Mwangi",
      position: "Principal",
      description: "With over 20 years of experience in technical education, Dr. Mwangi leads BIPS Technical College with a vision of excellence and innovation.",
      email: "principal@bipstc.ac.ke",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "Prof. Sarah Wanjiru",
      position: "Deputy Principal - Academics",
      description: "Prof. Wanjiru oversees all academic programs ensuring quality education and industry-relevant curriculum for our students.",
      email: "deputy.academics@bipstc.ac.ke",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      name: "Mr. David Ochieng",
      position: "Deputy Principal - Administration",
      description: "Mr. Ochieng brings extensive administrative expertise, ensuring smooth operations and student support services across all campuses.",
      email: "deputy.admin@bipstc.ac.ke",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
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
                  BIPS Technical College is a premier institution of technical and vocational education in Kenya, 
                  established with a mission to provide quality, industry-relevant training that empowers students 
                  with practical skills and knowledge for successful careers.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Since our founding, we have been committed to excellence in technical education, offering a wide 
                  range of programs including diploma courses, certificate programs, and artisan training. Our 
                  state-of-the-art facilities and experienced faculty ensure that students receive hands-on training 
                  that meets international standards.
                </p>
                
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We pride ourselves on our strong partnerships with industry leaders, which provide our students 
                  with internship opportunities and ensure our curriculum remains aligned with current market needs. 
                  Our graduates are highly sought after by employers across Kenya and beyond, testament to the 
                  quality of education we provide.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">5000+</h3>
                      <p className="text-muted-foreground">Students Enrolled</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                      <p className="text-muted-foreground">Industry Partners</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
                      <p className="text-muted-foreground">Employment Rate</p>
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
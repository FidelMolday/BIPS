import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wifi, BookOpen, FlaskConical, Laptop, Utensils, Dumbbell, Home, Library, Users } from 'lucide-react';

const CampusLife = () => {
  const facilities = [
    {
      icon: <Library className="w-12 h-12" />,
      title: "Modern Library",
      description: "State-of-the-art library with over 200,000 digital and physical resources, quiet study zones, and 24/7 access for students.",
      features: ["Digital Resources", "Study Rooms", "24/7 Access"]
    },
    {
      icon: <FlaskConical className="w-12 h-12" />,
      title: "Advanced Laboratories",
      description: "Cutting-edge science and engineering labs equipped with the latest technology and equipment for hands-on learning experiences.",
      features: ["Latest Equipment", "Safety Protocols", "Research Facilities"]
    },
    {
      icon: <Laptop className="w-12 h-12" />,
      title: "Computer Labs",
      description: "High-performance computing facilities with modern workstations, specialized software, and high-speed internet connectivity.",
      features: ["Modern Workstations", "Software Suite", "High-Speed Internet"]
    },
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "Smart Classrooms",
      description: "Technology-enabled learning spaces with interactive displays, wireless presentation systems, and collaborative learning tools.",
      features: ["Interactive Displays", "Wireless Systems", "Collaborative Tools"]
    },
    {
      icon: <Utensils className="w-12 h-12" />,
      title: "Dining Facilities",
      description: "Multiple cafeterias and food courts offering diverse, nutritious meal options in comfortable, modern dining spaces.",
      features: ["Diverse Menus", "Healthy Options", "Comfortable Seating"]
    },
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: "Sports Complex",
      description: "Comprehensive sports and fitness facilities including gymnasium, swimming pool, sports fields, and fitness center.",
      features: ["Gymnasium", "Swimming Pool", "Sports Fields"]
    },
    {
      icon: <Home className="w-12 h-12" />,
      title: "Student Housing",
      description: "Modern, secure accommodation with fully furnished rooms, common areas, and 24/7 security for a comfortable living experience.",
      features: ["Fully Furnished", "Common Areas", "24/7 Security"]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Student Center",
      description: "Vibrant hub for student activities, clubs, societies, and events with multipurpose spaces for gatherings and recreation.",
      features: ["Club Spaces", "Event Halls", "Recreation Areas"]
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Learning Commons",
      description: "Collaborative learning spaces designed for group work, presentations, and peer learning with modern amenities.",
      features: ["Group Study Areas", "Presentation Rooms", "Tech Support"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-hover text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="outline-white" size="lg" className="mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Campus Life at BIPS
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Experience world-class facilities designed to support your learning, growth, and success
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-university-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-university-dark mb-4">
              Modern School Facilities
            </h2>
            <p className="text-xl text-university-grey max-w-3xl mx-auto">
              Our campus features state-of-the-art facilities that provide students with everything they need to excel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-primary mb-4">
                  {facility.icon}
                </div>
                <h3 className="text-2xl font-bold text-university-dark mb-4">
                  {facility.title}
                </h3>
                <p className="text-university-grey mb-6">
                  {facility.description}
                </p>
                <div className="space-y-2">
                  {facility.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-university-dark">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-university-dark mb-6">
            Ready to Experience BIPS?
          </h2>
          <p className="text-xl text-university-grey mb-8 max-w-2xl mx-auto">
            Schedule a campus tour and see our facilities in person
          </p>
          <Button variant="university" size="lg" className="h-auto px-8 py-4 text-lg">
            Schedule a Campus Tour
          </Button>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
      <ChatBot />
    </div>
  );
};

export default CampusLife;

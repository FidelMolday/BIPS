import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Quote, GraduationCap, Briefcase, Award, TrendingUp } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Kamau",
      program: "Diploma in Information Technology",
      year: "Class of 2023",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      testimonial: "BIPS Technical College transformed my career. The hands-on training and industry connections helped me land my dream job at a leading tech company even before graduation. The lecturers were incredibly supportive and the facilities were world-class.",
      achievement: "Software Developer at Safaricom",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      name: "James Omondi",
      program: "Certificate in Electrical Engineering",
      year: "Class of 2022",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      testimonial: "The practical approach to learning at BIPS gave me the confidence and skills I needed to excel in my field. The advanced laboratories and real-world projects prepared me perfectly for the industry. I'm now running my own electrical contracting business.",
      achievement: "Founder, PowerTech Solutions",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      name: "Grace Wanjiku",
      program: "Diploma in Business Management",
      year: "Class of 2023",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      testimonial: "BIPS provided me with more than just education - it gave me a network, mentorship, and practical skills that set me apart. The business incubation program helped me launch my startup while still studying. Forever grateful for this opportunity.",
      achievement: "CEO, GreenLeaf Enterprises",
      icon: <Award className="w-6 h-6" />
    },
    {
      name: "David Mwangi",
      program: "Advanced Diploma in Mechanical Engineering",
      year: "Class of 2021",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      testimonial: "The quality of education at BIPS is exceptional. From modern workshops to experienced instructors who genuinely care about student success, everything exceeded my expectations. I secured a position at Kenya Airways and have been promoted twice already.",
      achievement: "Senior Engineer, Kenya Airways",
      icon: <GraduationCap className="w-6 h-6" />
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
            Success Stories
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Hear from our graduates who are making a difference in their industries and communities
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-university-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-university-dark mb-4">
              Student Testimonials
            </h2>
            <p className="text-xl text-university-grey max-w-3xl mx-auto">
              Real stories from real students who have transformed their lives through quality education at BIPS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-university-dark mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-primary font-semibold mb-1">
                      {testimonial.program}
                    </p>
                    <p className="text-sm text-university-grey">
                      {testimonial.year}
                    </p>
                  </div>
                  <Quote className="w-10 h-10 text-primary/20 flex-shrink-0" />
                </div>
                
                <p className="text-university-grey mb-6 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="flex items-center pt-4 border-t border-university-light-grey">
                  <div className="text-primary mr-3">
                    {testimonial.icon}
                  </div>
                  <p className="text-sm font-semibold text-university-dark">
                    {testimonial.achievement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-university-dark mb-4">
              Our Graduate Success Rate
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">85%</div>
              <div className="text-university-grey">Employment within 6 months</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">92%</div>
              <div className="text-university-grey">Career satisfaction rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">15K+</div>
              <div className="text-university-grey">Successful alumni</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-university-light-grey">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-university-dark mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-university-grey mb-8 max-w-2xl mx-auto">
            Join thousands of successful BIPS graduates who are making an impact in their careers
          </p>
          <Button variant="university" size="lg" className="h-auto px-8 py-4 text-lg">
            Apply Now
          </Button>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Testimonials;
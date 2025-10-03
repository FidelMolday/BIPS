import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';
import campusImage from '@/assets/campus-life.jpg';
import researchImage from '@/assets/research.jpg';
import graduationImage from '@/assets/graduation.jpg';

const InfoSection = () => {
  return (
    <section className="py-20 bg-university-light-grey">
      <div className="container mx-auto px-4">
        
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-university-dark mb-4">
            Leading the Way in Higher Education
          </h2>
          <p className="text-xl text-university-grey mb-12 max-w-3xl mx-auto">
            Discover why BIPS Technical College is the perfect choice for your technical education journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">Top 200</div>
              <div className="text-university-grey">Global University Rankings</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">45,000+</div>
              <div className="text-university-grey">Students Worldwide</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <div className="text-university-grey">Graduate Employment Rate</div>
            </div>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="space-y-20">
          
          {/* Campus Life */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-university-dark mb-6">
                Experience Campus Life
              </h3>
              <p className="text-university-grey mb-6 text-lg leading-relaxed">
                Immerse yourself in a vibrant campus community where learning extends beyond the classroom. 
                Our state-of-the-art facilities, diverse student organizations, and inclusive environment 
                create the perfect setting for personal and academic growth.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Modern learning facilities and laboratories
                </li>
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  200+ student clubs and societies
                </li>
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Comprehensive support services
                </li>
              </ul>
              <Link to="/campus-life">
                <Button variant="university" size="lg" className="h-auto px-8 py-3">
                  Explore Campus Life
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src={campusImage} 
                alt="Campus Life" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Research Excellence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <h3 className="text-3xl font-bold text-university-dark mb-6">
                Research Excellence
              </h3>
              <p className="text-university-grey mb-6 text-lg leading-relaxed">
                Join a research community that's making a real impact on society. Our world-class researchers 
                are tackling global challenges and creating innovative solutions across diverse fields of study.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Cutting-edge research facilities
                </li>
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Industry partnerships and collaborations
                </li>
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  PhD and research opportunities
                </li>
              </ul>
              <Button variant="university" size="lg" className="h-auto px-8 py-3">
                Discover Research
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="lg:order-1">
              <img 
                src={researchImage} 
                alt="Research Excellence" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Success Stories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-university-dark mb-6">
                Your Success Story Starts Here
              </h3>
              <p className="text-university-grey mb-6 text-lg leading-relaxed">
                Our graduates are leading change in their industries and communities worldwide. 
                With strong industry connections and comprehensive career support, we're here to 
                help you achieve your professional goals.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Career counseling and guidance
                </li>
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Industry placement opportunities
                </li>
                <li className="flex items-center text-university-dark">
                  <ArrowRight className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  Alumni network and mentorship
                </li>
              </ul>
              <Button variant="university" size="lg" className="h-auto px-8 py-3">
                Success Stories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div>
              <img 
                src={graduationImage} 
                alt="Graduate Success" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;
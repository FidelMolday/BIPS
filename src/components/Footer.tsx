import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Study',
      links: [
        'Undergraduate',
        'Postgraduate',
        'Research Degrees',
        'Online Learning',
        'International',
        'Course Search'
      ]
    },
    {
      title: 'Research',
      links: [
        'Research Areas',
        'Research Institutes',
        'Research Students',
        'Publications',
        'Industry Partnerships',
        'Research Support'
      ]
    },
    {
      title: 'About',
      links: [
        'Our Story',
        'Leadership',
        'Campus Locations',
        'Rankings',
        'News & Events',
        'Careers'
      ]
    },
    {
      title: 'Support',
      links: [
        'Current Students',
        'Student Services',
        'Library',
        'IT Support',
        'Accessibility',
        'Contact Us'
      ]
    }
  ];

  return (
    <footer className="bg-university-dark text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* University Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-primary rounded-sm mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <div>
                <div className="font-bold text-lg">WESTERN SYDNEY</div>
                <div className="text-sm text-university-grey">UNIVERSITY</div>
              </div>
            </div>
            
            <p className="text-university-grey mb-6 leading-relaxed">
              Western Sydney University is a world-class institution committed to providing 
              innovative education and conducting impactful research that benefits our communities.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">Locked Bag 1797, Penrith NSW 2751</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">1300 897 669</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">enquiry@westernsydney.edu.au</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <div className="text-sm font-semibold mb-3">Follow Us</div>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-university-grey hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-university-grey border-opacity-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex flex-wrap items-center space-x-6 mb-4 md:mb-0">
              <span className="text-university-grey">
                © 2024 Western Sydney University. All rights reserved.
              </span>
              <a href="#" className="text-university-grey hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-university-grey hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-university-grey hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
            
            <div className="flex items-center space-x-4 text-university-grey">
              <span>CRICOS Provider: 00917K</span>
              <span>|</span>
              <span>TEQSA: PRV12186</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
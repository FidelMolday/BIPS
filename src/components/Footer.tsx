import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Study',
      links: [
        'Diploma',
        'Certificate',
        'Artisan',
        'Online Learning',
      ]
    },
    {
      title: 'Research',
      links: [
        'Research Areas',
        'Research Institutes',
        'Research Students',
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
        'News & Events',
        'Careers'
      ]
    },
    {
      title: 'Support',
      links: [
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
            <a href="/" className="flex items-center mb-6 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-sm mr-3 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <div className="font-bold text-lg">BIPS TECHNICAL</div>
                <div className="text-sm text-university-grey">COLLEGE</div>
              </div>
            </a>
            
            <p className="text-university-grey mb-6 leading-relaxed">
              BIPS Technical College is a leading institution committed to providing 
              innovative technical education and skills development that benefits our communities in Kenya.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">Kiambu Road, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">+254 700 123 456</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">info@bips.ac.ke</span>
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
                © 2025 BIPS Technical College. All rights reserved.
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
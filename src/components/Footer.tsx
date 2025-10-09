import React from 'react';
import { Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import bipsLogo from '@/assets/bips-logo.png';

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
              <div className="w-10 h-10 mr-3 flex items-center justify-center">
                <img src={bipsLogo} alt="BIPS Logo" className="w-full h-full object-contain" />
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
                <span className="text-university-grey">P.O. Box 340 Kangemi, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">+254 704 094 393 / +254 705 631 531</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span className="text-university-grey">blessinginstitute84@gmail.com</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <div className="text-sm font-semibold mb-3">Follow Us</div>
              <div className="flex space-x-4">
                <a 
                  href="https://www.youtube.com/@BIPSTECHNICALCOLLEGE" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/bips_technicalcollegeofficial" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/bips-technical-college" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.tiktok.com/@bipstechnicalcollege" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/bipstechnical" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-university-grey bg-opacity-20 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
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
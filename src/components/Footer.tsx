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

  const locations = [
    {
      name: 'Kangemi Branch',
      address: 'Murada Road, Kangemi',
      landmark: 'Near Lianas Hospital, Daras, and the Chief\u2019s Camp.',
      phone: '0707 717 780',
    },
    {
      name: 'Kawangware Branch',
      address: 'Naivasha Road, 1st Floor, Cooperative Building',
      landmark: 'Near the Kawangware Market.',
      phone: '0704 094 393',
    },
    {
      name: 'Kikuyu Branch',
      address: 'Along the Southern Bypass',
      landmark: 'Access from the Waiyaki Way\u2013Kikuyu side and the Wangige\u2013Kikuyu side.',
      phone: '0790 222 885',
    },
  ];

  return (
    <footer className="bg-university-dark text-white">
      {/* Our Locations */}
      <div className="border-b border-university-grey border-opacity-20">
        <div className="container mx-auto px-4 py-12">
          <h3 className="font-bold text-xl mb-8 text-center">
            BIPS Technical College — Our Locations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.name}>
                <h4 className="font-semibold text-base mb-2">{location.name}</h4>
                <div className="flex items-start text-sm mb-2">
                  <MapPin className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-university-grey">{location.address}</span>
                </div>
                <p className="text-university-grey text-sm mb-2 ml-6">
                  {location.landmark}
                </p>
                <a
                  href={`tel:+254${location.phone.replace(/\s|^0/g, '')}`}
                  className="flex items-center text-sm hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-university-grey">{location.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                <span className="text-university-grey">P.O. Box 612–00625, Kangemi, Nairobi, Kenya</span>
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
                  href="https://www.tiktok.com/@bips_technicalofficial?_r=1&_t=ZS-91IczHUzNuE" 
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
                  href="https://x.com/search?q=BIPS%20Technical&t=rsbNzR-D9OwA5czlR86SsA&s=09" 
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
            
            <div className="flex items-center text-university-grey">
              <span>Made by FIDLAQUE Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
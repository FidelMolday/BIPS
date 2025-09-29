import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Menu, X, Phone } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      title: 'Study with Us',
      items: [
        'Undergraduate Degrees',
        'Postgraduate Degrees',
        'Research Degrees',
        'International Students',
        'Online Learning',
      ]
    },
    {
      title: 'Research',
      items: [
        'Research Areas',
        'Research Institutes',
        'Research Students',
        'Industry Partnerships',
      ]
    },
    {
      title: 'About Western',
      items: [
        'Our Story',
        'Leadership',
        'Campus Locations',
        'Rankings & Recognition',
      ]
    },
    {
      title: 'Community',
      items: [
        'Student Life',
        'Alumni',
        'Industry Partners',
        'Community Engagement',
      ]
    },
    {
      title: 'Alumni',
      items: [
        'Alumni Community',
        'Events & Networking',
        'Career Services',
        'Give Back',
      ]
    },
    {
      title: 'Indigenous',
      items: [
        'Indigenous Programs',
        'Cultural Support',
        'Community Partnerships',
        'Research',
      ]
    },
  ];

  return (
    <header className="w-full">
      {/* Top Utility Bar */}
      <div className="bg-university-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-6 text-sm">
              <button className="hover:text-university-grey transition-colors">STUDENTS</button>
              <button className="hover:text-university-grey transition-colors">STAFF</button>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-accent-red hover:bg-accent-red-hover text-sm font-medium">
                <Phone className="w-4 h-4 mr-2" />
                CONTACT US
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-sm mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div className="text-university-dark">
                  <div className="font-bold text-lg">WESTERN SYDNEY</div>
                  <div className="text-sm text-university-grey">UNIVERSITY</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger className="text-university-dark hover:text-primary font-medium">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-4 bg-white">
                          {item.items.map((subItem) => (
                            <NavigationMenuLink
                              key={subItem}
                              className="block px-3 py-2 text-sm text-university-dark hover:text-primary hover:bg-university-light-grey rounded-md transition-colors cursor-pointer"
                            >
                              {subItem}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-university-dark hover:text-primary">
                <Search className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-university-dark"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <div key={item.title} className="border-b border-gray-200 pb-2">
                  <div className="font-medium text-university-dark mb-2">{item.title}</div>
                  <div className="pl-4 space-y-1">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem}
                        className="block w-full text-left text-sm text-university-grey hover:text-primary py-1"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
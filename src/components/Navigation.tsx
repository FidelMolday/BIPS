import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, Phone, FileText, GraduationCap, BookOpen, Users, MessageSquare, Calendar } from 'lucide-react';
import logo from '@/assets/bips-logo.png';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Courses', href: '/courses' },
    { title: 'About us', href: '/about-us' },
    { title: 'Admission', href: '/admissions' },
    { title: 'Contact', href: '/contact' },
    { title: 'Intake', href: '/intake' },
  ];

  return (
    <header className="w-full">
      {/* Top Utility Bar */}
      <div className="bg-university-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
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
              <a href="/" className="flex items-center">
                <img src={logo} alt="BIPS Technical College" className="h-14 w-auto" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.href}
                        className="text-university-dark hover:text-primary font-medium px-4 py-2 inline-block"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-university-dark hover:text-primary"
                onClick={() => setIsSearchOpen(true)}
              >
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
                <a
                  key={item.title}
                  href={item.href}
                  className="block w-full text-left font-medium text-university-dark py-2 border-b border-gray-200"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search for courses, pages, or information..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Campus Life</span>
            </CommandItem>
            <CommandItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Testimonials</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Courses">
            <CommandItem>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Certificate Courses</span>
            </CommandItem>
            <CommandItem>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Diploma Programs</span>
            </CommandItem>
            <CommandItem>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Artisan Courses</span>
            </CommandItem>
            <CommandItem>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Short Courses</span>
            </CommandItem>
            <CommandItem>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Online Courses</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Information">
            <CommandItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Contact Information</span>
            </CommandItem>
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Current Intake</span>
            </CommandItem>
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              <span>Application Process</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navigation;

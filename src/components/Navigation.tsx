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
    { title: 'Home', href: '/', keywords: ['home', 'main', 'index'] },
    { title: 'Courses', href: '/courses', keywords: ['courses', 'programs', 'training', 'hospitality', 'cosmetology', 'fashion', 'electrical', 'plumbing', 'welding', 'driving', 'computer', 'mechanic', 'nursing', 'language'] },
    { title: 'About us', href: '/about-us', keywords: ['about', 'leadership', 'management', 'principal', 'director', 'history', 'story'] },
    { title: 'Admission', href: '/admissions', keywords: ['admission', 'apply', 'enrollment', 'registration', 'join'] },
    { title: 'Contact', href: '/contact', keywords: ['contact', 'email', 'phone', 'address', 'location'] },
    { title: 'Intake', href: '/intake', keywords: ['intake', 'enrollment', 'application', 'deadline', 'dates'] },
  ];

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
    return navItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.includes(searchTerm))
    );
  };

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
            <CommandItem onSelect={() => { window.location.href = '/'; setIsSearchOpen(false); }}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Courses</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/about-us'; setIsSearchOpen(false); }}>
              <Users className="mr-2 h-4 w-4" />
              <span>About Us</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/admissions'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Admissions</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/contact'; setIsSearchOpen(false); }}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/intake'; setIsSearchOpen(false); }}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Intake</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Courses">
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Hospitality Management (Catering)</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Cosmetology (Hair & Beauty)</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Fashion Design (Dress Making)</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Electrical Installation</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Motor Vehicle Mechanic</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Certified Nursing Assistant</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/courses'; setIsSearchOpen(false); }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>Computer Packages</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => { window.location.href = '/contact'; setIsSearchOpen(false); }}>
              <Phone className="mr-2 h-4 w-4" />
              <span>Contact: 0707 717 780 / 0704 094 393</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/intake'; setIsSearchOpen(false); }}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Current Intake Information</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/about-us'; setIsSearchOpen(false); }}>
              <Users className="mr-2 h-4 w-4" />
              <span>Leadership Team</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navigation;

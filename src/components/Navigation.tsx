import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, Phone, FileText, GraduationCap, BookOpen, Users, MessageSquare, Calendar, Clock, Newspaper, UserPlus } from 'lucide-react';
import logo from '@/assets/bips-logo.png';
import { Link } from 'react-router-dom';
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

  // Live clock for the top bar
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });
  React.useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="w-full">
      {/* ===== Top Utility Bar ===== */}
      <div className="bg-university-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left: clock + latest news */}
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {time}
              </span>
              <Link to="/latest-news" className="flex items-center gap-2 hover:text-primary transition">
                <Newspaper className="w-4 h-4" />
                Latest News
                <span className="bg-accent-red text-white px-2 py-0.5 rounded text-xs font-semibold ml-1">
                  New
                </span>
              </Link>
            </div>

            {/* Right: Book Appointment */}
            <Link to="/book-appointment">
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-sm font-medium"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Main Navigation ===== */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="BIPS Technical College" className="h-14 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation: nav items + Apply Now together */}
            <div className="hidden lg:flex items-center">
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

              {/* Apply Now — right after Intake, in accent-red */}
              <Link to="/admissions" className="ml-3">
                <Button
                  size="sm"
                  className="bg-accent-red hover:bg-accent-red-hover text-white text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </Link>
            </div>

            {/* Right side: Search + Mobile Menu */}
            <div className="flex items-center space-x-3">
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
                <Link
                  key={item.title}
                  to={item.href}
                  className="block w-full text-left font-medium text-university-dark py-2 border-b border-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                to="/admissions"
                className="block w-full text-center bg-accent-red hover:bg-accent-red-hover text-white font-medium py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Search Dialog (unchanged) */}
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
            <CommandItem onSelect={() => { window.location.href = '/book-appointment'; setIsSearchOpen(false); }}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Book Appointment</span>
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
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown, Menu, X, Phone, FileText, GraduationCap, BookOpen, Users, MessageSquare, Calendar } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
    {
      title: 'Courses',
    },
    {
      title: 'About us',
     
    },
    {
      title: 'Admission',
      
    },
    {
      title: 'Contact',
     
    },
    {
      title: 'Intake',
     
    },
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
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-sm mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div className="text-university-dark">
                  <div className="font-bold text-lg">BIPS TECHNICAL</div>
                  <div className="text-sm text-university-grey">COLLEGE</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="space-x-1">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/" className="text-university-dark hover:text-primary font-medium px-4 py-2 inline-block">
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
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

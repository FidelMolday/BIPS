import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, BookOpen, FileText, Globe } from 'lucide-react';

const ContentCards = () => {
  const cards = [
    {
      title: 'Diploma Courses',
      description: 'Explore our comprehensive range of undergraduate programs designed to kickstart your career journey.',
      icon: GraduationCap,
      link: '#',
      color: 'bg-primary'
    },
    {
      title: 'Certificate Courses',
      description: 'Advance your career with our specialized postgraduate programs and research opportunities.',
      icon: BookOpen,
      link: '#',
      color: 'bg-primary'
    },
    {
      title: 'Artisan Courses',
      description: 'Discover the various pathways to join our university community and start your educational journey.',
      icon: FileText,
      link: '#',
      color: 'bg-primary'
    },
    {
      title: 'Online courses',
      description: 'Learn about our support services and programs specifically designed for international students.',
      icon: Globe,
      link: '#',
      color: 'bg-primary'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} text-white rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer`}
            >
              {/* Card Header with Icon */}
              <div className="p-6 pb-0">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-2">
                <h3 className="text-xl font-bold mb-3 text-white">
                  {card.title}
                </h3>
                <p className="text-white text-opacity-90 mb-6 text-sm leading-relaxed">
                  {card.description}
                </p>
                
                {/* Learn More Button */}
                <Button
                  variant="outline-white"
                  size="sm"
                  className="w-full group-hover:bg-white group-hover:text-primary transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
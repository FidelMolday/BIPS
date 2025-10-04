import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';

const Courses = () => {
  // 12 course placeholders (3 rows of 4)
  const courses = [
    { id: 1, title: 'Hospitality Management (Catering)', status: 'INTAKE ONGOING' },
    { id: 2, title: 'Cosmetology (Hair & Beauty)', status: 'INTAKE ONGOING' },
    { id: 3, title: 'Fashion Design (Dress Making)', status: 'INTAKE ONGOING' },
    { id: 4, title: 'Course Title 4', status: 'INTAKE ONGOING' },
    { id: 5, title: 'Course Title 5', status: 'INTAKE ONGOING' },
    { id: 6, title: 'Course Title 6', status: 'INTAKE ONGOING' },
    { id: 7, title: 'Course Title 7', status: 'INTAKE ONGOING' },
    { id: 8, title: 'Course Title 8', status: 'INTAKE ONGOING' },
    { id: 9, title: 'Course Title 9', status: 'INTAKE ONGOING' },
    { id: 10, title: 'Course Title 10', status: 'INTAKE ONGOING' },
    { id: 11, title: 'Course Title 11', status: 'INTAKE ONGOING' },
    { id: 12, title: 'Course Title 12', status: 'INTAKE ONGOING' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-background">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
            <p className="text-lg opacity-90">Explore our wide range of professional training programs</p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  {/* Placeholder for image - user will add their own */}
                  <div className="bg-muted h-48 flex items-center justify-center border-b">
                    <p className="text-muted-foreground text-sm">Add Your Image Here</p>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {course.title.toUpperCase()}
                    </h3>
                    
                    {/* Status Badge */}
                    <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-semibold mb-3">
                      {course.status}
                    </div>
                    
                    {/* Contact Info */}
                    <div className="text-sm space-y-1">
                      <p className="font-semibold">📞 0707 717 780 / 0704 094 393</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Courses;

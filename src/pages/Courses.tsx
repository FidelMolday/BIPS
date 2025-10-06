import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import hospitalityImg from '@/assets/course-hospitality.jpg';
import cosmetologyImg from '@/assets/course-cosmetology.jpg';
import fashionImg from '@/assets/course-fashion.jpg';
import electricalImg from '@/assets/course-electrical.jpg';
import plumbingImg from '@/assets/course-plumbing.jpg';
import weldingImg from '@/assets/course-welding.jpg';
import drivingImg from '@/assets/course-driving.jpg';
import computerImg from '@/assets/course-computer.jpg';
import mechanicImg from '@/assets/course-mechanic.jpg';
import nursingImg from '@/assets/course-nursing.jpg';
import languageImg from '@/assets/course-language.jpg';
import houseManagerImg from '@/assets/course-house-manager.jpg';

const Courses = () => {
  // 12 course placeholders (3 rows of 4)
  const courses = [
    { id: 1, title: 'Hospitality Management (Catering)', status: 'INTAKE ONGOING', image: hospitalityImg },
    { id: 2, title: 'Cosmetology (Hair & Beauty)', status: 'INTAKE ONGOING', image: cosmetologyImg },
    { id: 3, title: 'Fashion Design (Dress Making)', status: 'INTAKE ONGOING', image: fashionImg },
    { id: 4, title: 'Electrical Installation', status: 'INTAKE ONGOING', image: electricalImg },
    { id: 5, title: 'Plumbing', status: 'INTAKE ONGOING', image: plumbingImg },
    { id: 6, title: 'Welding', status: 'INTAKE ONGOING', image: weldingImg },
    { id: 7, title: 'Driving', status: 'INTAKE ONGOING', image: drivingImg },
    { id: 8, title: 'Computer Packages', status: 'INTAKE ONGOING', image: computerImg },
    { id: 9, title: 'Motor Vehicle Mechanic', status: 'INTAKE ONGOING', image: mechanicImg },
    { id: 10, title: 'Certified Nursing Assistant', status: 'INTAKE ONGOING', image: nursingImg },
    { id: 11, title: 'Foreign Language', status: 'INTAKE ONGOING', image: languageImg },
    { id: 12, title: 'Assistant House Manager', status: 'INTAKE ONGOING', image: houseManagerImg },
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
                  <div className="h-48 overflow-hidden border-b">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
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

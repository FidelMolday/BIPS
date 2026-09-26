import { useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import coursesCatalogue from '@/assets/pdf/BIPS-Courses-Catalogue.pdf';
import classImg from '@/assets/Gallery/class.jpeg';
import hairdressingImg from '@/assets/Gallery/hairdressing.jpeg';
import generalImg from '@/assets/Gallery/WhatsApp Image 2026-09-25 at 21.55.22.jpeg';

// 14 course categories, matching the "OUR COURSES" flyer.
// Photo assigned per course; hairdressing gets its own shot, the rest
// alternate between the classroom photo and the general gallery photo.
const courses = [
  {
    id: 1,
    title: 'Hospitality & Catering',
    image: generalImg,
    items: ['Food & Beverage Service', 'Kitchen Operations', 'Housekeeping', 'Front Office'],
  },
  {
    id: 2,
    title: 'Hair & Beauty (Cosmetology)',
    image: hairdressingImg,
    items: ['Hairdressing', 'Beauty Therapy', 'Nail Technology', 'Salon Management'],
  },
  {
    id: 3,
    title: 'Fashion Design & Tailoring',
    image: generalImg,
    items: ['Dressmaking', 'Pattern Making', 'Garment Construction', 'Fashion Entrepreneurship'],
  },
  {
    id: 4,
    title: 'I.C.T',
    image: classImg,
    items: ['Computer Packages (ICDL)', 'Basic & Advanced Computer Skills', 'Graphic Design', 'Web Design & Digital Skills'],
  },
  {
    id: 5,
    title: 'Motor Vehicle Mechanic',
    image: generalImg,
    items: ['Vehicle Maintenance', 'Engine Repair', 'Auto Electrical Systems', 'Practical Hands-on Training'],
  },
  {
    id: 6,
    title: 'Plumbing & Pipe Fitting',
    image: generalImg,
    items: ['Plumbing Installation', 'Pipe Fitting', 'Water Systems Maintenance', 'Practical Training'],
  },
  {
    id: 7,
    title: 'Electrical Installation',
    image: generalImg,
    items: ['Building Wiring', 'Electrical Maintenance', 'Solar Installation', 'Practical Hands-on Training'],
  },
  {
    id: 8,
    title: 'Driving',
    image: generalImg,
    items: ['Defensive Driving', 'Road Safety & Traffic Rules', 'Practical & Theory Training', 'Licensing Support'],
  },
  {
    id: 9,
    title: 'Caregiver / HSS / CNA',
    image: classImg,
    items: ['Caregiving Skills', 'Home Support Services (HSS)', 'Certified Nursing Assistant (CNA)', 'Patient Care & First Aid'],
  },
  {
    id: 10,
    title: 'Barista',
    image: generalImg,
    items: ['Coffee Preparation', 'Latte Art', 'Customer Service', 'Café Management'],
  },
  {
    id: 11,
    title: 'Baking & Pastry',
    image: generalImg,
    items: ['Cake Making', 'Bread & Pastries', 'Dessert Preparation', 'Bakery Business Skills'],
  },
  {
    id: 12,
    title: 'Community Health',
    image: classImg,
    items: ['Community Health Worker (CHW)', 'Public Health Basics', 'First Aid', 'Health Promotion & Disease Prevention'],
  },
  {
    id: 13,
    title: 'International Languages',
    image: classImg,
    items: ['English', 'French', 'Arabic', 'Italian', 'Spanish', 'Russian', 'Chinese', 'German', 'Japanese', 'Korean'],
  },
  {
    id: 14,
    title: 'Pre-Departure Training (All Countries)',
    image: classImg,
    items: ['Cultural Orientation', 'Basic Language Preparation', 'Travel & Airport Procedures', "Workers' Rights", 'Safety & Personal Security'],
  },
];

const categories = ['All', ...courses.map((c) => c.title)];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  const visibleCourses = useMemo(() => {
    let list =
      activeCategory === 'All'
        ? courses
        : courses.filter((c) => c.title === activeCategory);

    list = [...list];
    if (sortOrder === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOrder === 'za') list.sort((a, b) => b.title.localeCompare(a.title));

    return list;
  }, [activeCategory, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow bg-background">
        {/* Header banner */}
        <section className="bg-primary text-primary-foreground py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-wide">
              OUR COURSES
            </h1>
            <p className="text-lg md:text-xl italic opacity-90">
              Turn Your Passion Into a Career in 3 – 6 Months
            </p>

            <div className="mt-8 flex flex-col items-center gap-2">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                <a href={coursesCatalogue} download="BIPS-Courses-Catalogue.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download Courses Catalogue (PDF)
                </a>
              </Button>
              <p className="text-sm opacity-80">
                Get complete information about all our courses in one document
              </p>
            </div>
          </div>
        </section>

        {/* Filter / Sort bar */}
        <section className="py-6 border-b bg-muted/30">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold whitespace-nowrap">
                Filter Courses:
              </span>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold whitespace-nowrap">
                Sort by:
              </span>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="az">A to Z</SelectItem>
                  <SelectItem value="za">Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Courses Grid — photo cards, matching capdevinstitute.com/eb-courses/ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
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

                    <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                      {course.items.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-semibold mb-3">
                      INTAKE ONGOING
                    </div>

                    <p className="text-sm font-semibold">
                      📞 0707 717 780 / 0704 094 393
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / tagline strip */}
        <section className="bg-primary text-primary-foreground py-6">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-2 text-lg italic font-semibold">
            <span>Skills</span>
            <span>|</span>
            <span>Discipline</span>
            <span>|</span>
            <span>Opportunity</span>
            <span>|</span>
            <span>A Brighter Future</span>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Courses;
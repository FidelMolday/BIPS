import { useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Download,
  MessageCircle,
  Mail,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from 'lucide-react';
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
import id1 from '@/assets/Gallery/ID1Hospitality.png';
import id3 from '@/assets/Gallery/id3Fashion_Design.jpeg';
import id4 from '@/assets/Gallery/id4ICT.jpeg';
import id5 from '@/assets/Gallery/id5Motos.jpeg';
import id6 from '@/assets/Gallery/id6Plumbing.jpeg';
import id7 from '@/assets/Gallery/id7electicity.jpeg';
import id8 from '@/assets/Gallery/id8Driving.jpeg';
import id9 from '@/assets/Gallery/id9Care.jpeg';
import id10 from '@/assets/Gallery/id10Barista.jpeg';
import id11 from '@/assets/Gallery/id11Baking.jpeg';
import id12 from '@/assets/Gallery/id12Community_Health.jpeg';

// Small inline TikTok glyph — lucide-react has no official TikTok icon,
// so this mirrors the one already used in Footer.tsx for visual consistency.
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Same accounts linked in Footer.tsx, plus WhatsApp (college phone) and
// Gmail (college inbox) so every course card can link straight out to them.
const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/254704094393',
    icon: MessageCircle,
  },
  {
    label: 'Email',
    href: 'mailto:blessinginstitute84@gmail.com',
    icon: Mail,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@bips_technicalofficial?_r=1&_t=ZS-91IczHUzNuE',
    icon: TikTokIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bips_technicalcollegeofficial',
    icon: Instagram,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@BIPSTECHNICALCOLLEGE',
    icon: Youtube,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/bips-technical-college',
    icon: Linkedin,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/search?q=BIPS%20Technical&t=rsbNzR-D9OwA5czlR86SsA&s=09',
    icon: Twitter,
  },
];

const courses = [
  {
    id: 1,
    title: 'Hospitality & Catering',
    image: id1,
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
    image: id3,
    items: ['Dressmaking', 'Pattern Making', 'Garment Construction', 'Fashion Entrepreneurship'],
  },
  {
    id: 4,
    title: 'I.C.T',
    image: id4,
    items: ['Computer Packages (ICDL)', 'Basic & Advanced Computer Skills', 'Graphic Design', 'Web Design & Digital Skills'],
  },
  {
    id: 5,
    title: 'Motor Vehicle Mechanic',
    image: id5,
    items: ['Vehicle Maintenance', 'Engine Repair', 'Auto Electrical Systems', 'Practical Hands-on Training'],
  },
  {
    id: 6,
    title: 'Plumbing & Pipe Fitting',
    image: id6,
    items: ['Plumbing Installation', 'Pipe Fitting', 'Water Systems Maintenance', 'Practical Training'],
  },
  {
    id: 7,
    title: 'Electrical Installation',
    image: id7,
    items: ['Building Wiring', 'Electrical Maintenance', 'Solar Installation', 'Practical Hands-on Training'],
  },
  {
    id: 8,
    title: 'Driving',
    image: id8,
    items: ['Defensive Driving', 'Road Safety & Traffic Rules', 'Practical & Theory Training', 'Licensing Support'],
  },
  {
    id: 9,
    title: 'Caregiver / HSS / CNA',
    image: id9,
    items: ['Caregiving Skills', 'Home Support Services (HSS)', 'Certified Nursing Assistant (CNA)', 'Patient Care & First Aid'],
  },
  {
    id: 10,
    title: 'Barista',
    image: id10,
    items: ['Coffee Preparation', 'Latte Art', 'Customer Service', 'Café Management'],
  },
  {
    id: 11,
    title: 'Baking & Pastry',
    image: id11,
    items: ['Cake Making', 'Bread & Pastries', 'Dessert Preparation', 'Bakery Business Skills'],
  },
  {
    id: 12,
    title: 'Community Health',
    image: id12,
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
    image: generalImg,
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

                    <p className="text-sm font-semibold mb-3">
                      📞 0707 717 780 / 0704 094 393
                    </p>

                    {/* Social links — same accounts as the site footer */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t">
                      {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          title={label}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-2">
              Fee Structure – All Courses
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Affordable, flexible payment plans across all our courses
            </p>

            {/* Payment Plan table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="border-2 border-primary/20 text-center">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Monthly
                  </p>
                  <p className="text-3xl font-extrabold text-primary">
                    KSh 10,000
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 text-center">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Per Semester
                  </p>
                  <p className="text-3xl font-extrabold text-primary">
                    KSh 30,000
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 text-center">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Per Year
                  </p>
                  <p className="text-3xl font-extrabold text-primary">
                    KSh 90,000
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Options summary */}
            <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
              <p className="font-semibold mb-1">
                Flexible payment options available:
              </p>
              <p className="text-lg font-bold">
                KSh 10,000 Monthly | KSh 30,000 Per Semester | KSh 90,000 Per Year
              </p>
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
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Download } from 'lucide-react';

// Gallery imports (Vite handles these as URLs)
import gallery1 from '@/assets/Gallery/Screenshot_2026-09-24_14-23-47.png';
import gallery2 from '@/assets/Gallery/Screenshot_2026-09-24_14-24-12.png';
import gallery3 from '@/assets/Gallery/Screenshot_2026-09-24_14-25-02.png';
import gallery4 from '@/assets/Gallery/Screenshot_2026-09-24_14-25-33.png';
import gallery5 from '@/assets/Gallery/Screenshot_2026-09-24_14-25-55.png';

// Full institutional profile — downloadable from the "Our Story" section
import institutionalProfile from '@/assets/pdf/BIPS-Institutional-Profile.pdf';

const AboutUs = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const leaders = [
    {
      name: "STEVE KAMWANZA",
      initials: "SK",
      position: "PRINCIPAL",
      description: "Leading BIPS Technical College with a vision of excellence and innovation in technical education.",
      email: "principal@bipstc.ac.ke"
    },
    {
      name: "KEVIN MBUGUA",
      initials: "KM",
      position: "OPERATIONS MANAGER",
      description: "Oversees all operations ensuring quality education and smooth functioning across all departments.",
      email: "operations@bipstc.ac.ke"
    },
    {
      name: "ASHA MOHAMED",
      initials: "AM",
      position: "COLLEGE SECRETARY",
      description: "Manages administrative operations and ensures efficient coordination across all college departments.",
      email: "secretary@bipstc.ac.ke"
    },
    {
      name: "MUKUHI KARIMI",
      initials: "MK",
      position: "DIRECTOR",
      description: "Brings extensive expertise in strategic direction and ensuring the college meets its mission and goals.",
      email: "director@bipstc.ac.ke"
    }
  ];

  const galleryImages = [
    { src: gallery1, alt: "BIPS Graduation Ceremony" },
    { src: gallery2, alt: "BIPS Graduates Celebrating" },
    { src: gallery3, alt: "BIPS Graduation Procession" },
    { src: gallery4, alt: "BIPS Graduation Day" },
    { src: gallery5, alt: "BIPS Graduates Group" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-white/90">Empowering the future through technical excellence</p>
          </div>
        </section>

        {/* Institution Description */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>

              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Blessing Institute of Professional Studies (BIPS) is a registered institution under the Ministry of Higher Education, Technical Vocational and Education Training Chapter (TVET), business registration Act of the companies & Societies.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  The college was started back in 2014 in Kangemi, Nairobi, with 6 students inside a salon. We have had over 6,000 students since we opened and we have produced great professionals who are working in and out of the country. At BIPS, we equip our students with a great understanding on how to handle clients, workmates, service delivery in their work places and above all handling themselves decently.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  We have enjoyed great growth both physically and academically thus we have expanded our classes. Today we operate three campuses — Kangemi, Kawangware (along Naivasha Road, Co-operative Bank building), and Kikuyu — and we are still looking forward to establishing other branches across Kenya.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  The college is fully equipped with modern facilities that make it easy for our instructors to give the best to the students. We are one of the best leading colleges in Nairobi County as far as technical aspect is concerned.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">6,000+</h3>
                      <p className="text-muted-foreground">Students Trained</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">2014</h3>
                      <p className="text-muted-foreground">Year Established</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-4xl font-bold text-primary mb-2">3</h3>
                      <p className="text-muted-foreground">Branches</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Full Institutional Profile download */}
                <div className="flex flex-col items-center gap-2 mt-10 text-center">
                  <Button asChild size="lg" className="font-semibold">
                    <a href={institutionalProfile} download="BIPS-Institutional-Profile.pdf">
                      <Download className="mr-2 h-5 w-5" />
                      Download Full Institutional Profile (PDF)
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Our complete institutional profile — history, vision, mission, programmes, campuses and more
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* Graduation Gallery Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-widest text-orange-500 uppercase mb-3">
                Our Moments
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Graduation Gallery</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Celebrating our successful graduates and their achievements
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow group aspect-[4/3]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {image.alt}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated leaders who guide BIPS Technical College towards excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {leaders.map((leader, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <CardContent className="p-8 text-center flex flex-col items-center">
                    {/* Initials Avatar — light peach circle */}
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-3xl mb-6"
                      style={{ backgroundColor: '#FDEBD2', color: '#F97316' }}
                    >
                      {leader.initials}
                    </div>

                    <h3 className="text-xl font-bold tracking-wide mb-2 text-gray-900">
                      {leader.name}
                    </h3>
                    <p className="text-sm font-semibold tracking-wider text-orange-500 mb-6">
                      {leader.position}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                      {leader.description}
                    </p>

                    {/* Actions row */}
                    <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100 w-full mt-auto">
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center text-sm text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-sm text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            ×
          </button>

          <button
            type="button"
            className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
            }}
            aria-label="Next"
          >
            ›
          </button>

          <p className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm">
            {galleryImages[lightboxIndex].alt} — {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
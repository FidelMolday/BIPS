import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-students.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: heroImage,
      title: "Graduate Excellence Expo",
      subtitle: "Join us on 16 October to explore postgrad study, get career advice, and have real conversations that could shape your future.",
      ctaText: "Register Now",
      ctaLink: "#"
    },
    {
      image: heroImage,
      title: "Stay Near. Go Far.",
      subtitle: "Your future's closer than you think. Discover world-class education right in your backyard.",
      ctaText: "Learn More",
      ctaLink: "#"
    },
    {
      image: heroImage,
      title: "Free Online Study Sessions",
      subtitle: "Get exam-ready with 24 free online sessions led by expert teachers. Covering 15 subjects, plus a practice exam with expert feedback.",
      ctaText: "Find Out More",
      ctaLink: "#"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative">
      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* Content */}
              <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-8 leading-relaxed opacity-95">
                    {slide.subtitle}
                  </p>
                  <Button 
                    variant="cta" 
                    size="lg"
                    className="text-lg px-8 py-3 h-auto"
                  >
                    {slide.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-university-light-grey border-b">
        <div className="container mx-auto px-4 py-3">
          <p className="text-sm text-university-dark">
            <strong>Western Sydney University Cyber Incidents:</strong> For more information about the University's cyber incidents, and to access the support services available, please visit the dedicated webpage{' '}
            <a href="#" className="text-primary hover:underline font-medium">here</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
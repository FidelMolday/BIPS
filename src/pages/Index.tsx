import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ContentCards from '@/components/ContentCards';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ContentCards />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index;

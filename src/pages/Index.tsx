import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ContentCards from '@/components/ContentCards';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ContentCards />
      <InfoSection />
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </div>
  );
};

export default Index;

'use client';
import React, { useState } from 'react';
import { THEME } from '@/components/landing-page/theme';
import { Navbar } from '@/components/landing-page/navbar';
import { HeroSection } from '@/components/landing-page/hero-section';
import { StatsSection } from '@/components/landing-page/stats-section';
import { SpecialtiesSection } from '@/components/landing-page/specialties-section';
import { HowItWorksSection } from '@/components/landing-page/how-it-works-section';
import { CTASection } from '@/components/landing-page/cta-section';
import { Footer } from '@/components/landing-page/footer';
import { AIModal } from '@/components/landing-page/ai-modal';

export default function TelemedicineLanding() {
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: THEME.colors.offWhite }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <SpecialtiesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
      {showAIModal && <AIModal onClose={() => setShowAIModal(false)} />}
    </div>
  );
}
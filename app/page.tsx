import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";
import { FeaturesBentoGrid } from "@/components/FeaturesBentoGrid";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import DoctorsSection from "@/components/DoctorsSection";
import SecondaryCTA from "@/components/SecondaryCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="relative flex items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E6F9F0] to-[#F9FAFB]">
        <div id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column starts at the same top as the image */}
            <div className="flex flex-col justify-start items-start self-start">
              <div className="space-y-6 w-full max-w-lg">
                <h1 className="text-5xl lg:text-6xl font-semibold text-[#111111] leading-tight">
                  Find the right doctor and book a consultation online.
                </h1>
                <p className="text-lg lg:text-xl text-[#4A4A4A] leading-relaxed">
                  Access top medical professionals from the comfort of your home.
                </p>
                <div className="pt-2">
                  <Link href="/signup">
                    <Button className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white px-8 h-11 text-base font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column - image + stats */}
            <div className="hidden lg:flex justify-center items-start self-start">
              <div className="relative w-full max-w-lg">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/hero-bg.jpg"
                    alt="Telemedicine consultation"
                    fill
                    className="object-cover rounded-xl shadow-lg"
                    priority
                    sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 40vw, 512px"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <StatsCard
                    label="Doctors"
                    value={500}
                    icon={
                      <svg
                        className="w-5 h-5 text-[#2AB3A3]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    }
                  />
                  <StatsCard
                    label="Patients"
                    value={10000}
                    icon={
                      <svg
                        className="w-5 h-5 text-[#2AB3A3]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Value Proposition Section */}
          <div id="features" className="mt-24 lg:mt-32 pt-16 lg:pt-20 border-t border-gray-200/50 scroll-mt-24">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#111111] text-center mb-12">
              Why Choose Our Telemedicine Platform
            </h2>
            <FeaturesBentoGrid />
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="mt-24 lg:mt-32 pt-16 lg:pt-20 border-t border-gray-200/50 scroll-mt-24">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#111111] text-center mb-12">
              How It Works
            </h2>
            <HowItWorksSection />
          </div>

          {/* Doctors Section */}
          <div id="doctors" className="mt-24 lg:mt-32 pt-16 lg:pt-20 border-t border-gray-200/50 scroll-mt-24">
            <DoctorsSection />
          </div>

          {/* Secondary CTA */}
          <div className="mt-24">
            <SecondaryCTA />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

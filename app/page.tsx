import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="relative flex items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E6F9F0] to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Hero Content - Left Aligned */}
            <div className="max-w-2xl">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-semibold text-[#111111] leading-tight">
                  Find the right doctor and book a consultation online.
                </h1>
                <p className="text-lg lg:text-xl text-[#4A4A4A] leading-relaxed">
                  Access top medical professionals from the comfort of your home.
                </p>
                <div className="pt-4">
                  <Link href="/book">
                    <Button className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white px-8 h-11 text-base font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Hero Image - Right side, hidden on mobile */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-4/3">
                <Image
                  src="/images/hero-bg.jpg"
                  alt="Telemedicine consultation"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  priority
                  sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 40vw, 512px"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

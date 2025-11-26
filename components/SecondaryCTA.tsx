"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SecondaryCTA() {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-gradient-to-br from-[#E6F9F0] to-[#F9FAFB] p-8 md:p-12">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#2AB3A3]/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#2AB3A3]/10 blur-2xl" />

        <div className="relative">
          <h3 className="text-3xl md:text-4xl font-semibold text-[#111111]">
            Ready to get care from licensed doctors?
          </h3>
          <p className="mt-3 text-base md:text-lg text-[#4A4A4A]">
            Create your account or book a quick appointment in minutes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book">
              <Button className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white h-11 px-6 rounded-lg shadow-sm hover:shadow-md">
                Book Appointment
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                className="h-11 px-6 rounded-lg border-[#2AB3A3]/30 text-[#1F8478] hover:text-white hover:bg-[#1F8478]"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
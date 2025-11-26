"use client";

import Image from "next/image";
import React from "react";

type Doctor = {
  name: string;
  specialty: string;
  bio: string;
  imageSrc: string;
};

const doctors: Doctor[] = [
  {
    name: "Dr. Sara Benali",
    specialty: "General Medicine",
    bio: "Provides evidence-based primary care, with experience in remote triage and routine medical assessments.",
    imageSrc: "/images/doctors/sara-benali.jpg",
  },
  {
    name: "Dr. Youssef El Idrissi",
    specialty: "Dermatology",
    bio: "Focuses on skin conditions commonly managed through virtual consultations, including rashes, acne, and follow-up evaluations.",
    imageSrc: "/images/doctors/youssef-el-idrissi.jpg",
  },
  {
    name: "Dr. Lina Haddou",
    specialty: "Pediatrics",
    bio: "Supports parents with guidance on common childhood symptoms, routine concerns, and non-emergency follow-up care.",
    imageSrc: "/images/doctors/lina-haddou.jpg",
  },
  {
    name: "Dr. Amine Khalloufi",
    specialty: "Cardiology",
    bio: "Provides remote reviews for stable cardiovascular conditions and offers structured follow-up recommendations when appropriate.",
    imageSrc: "/images/doctors/amine-khalloufi.jpg",
  },
];

export default function DoctorsSection() {
  // Duplicate list for seamless loop
  const looped = [...doctors, ...doctors];

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#111111]">
          Meet Our Medical Professionals
        </h2>
        <p className="mt-4 text-base lg:text-lg text-[#4A4A4A] leading-relaxed">
          Our platform collaborates with qualified clinicians representing multiple specialties.
          Each professional is verified and trained to provide remote medical consultations.
        </p>
      </div>

      <div className="mt-12 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F9FAFB] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F9FAFB] to-transparent" />

        <div className="flex gap-6 will-change-transform animate-marquee">
          {looped.map((doc, idx) => (
            <DoctorCard key={`${doc.name}-${idx}`} doctor={doc} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="w-[300px] shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-black dark:border-white/10">
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-xl">
        <Image
          src={doctor.imageSrc}
          alt={doctor.name}
          fill
          className="object-cover"
          sizes="300px"
          priority={false}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#E6F9F0] text-[#2AB3A3] px-2.5 py-0.5 text-xs font-medium">
            {doctor.specialty}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-[#111111]">{doctor.name}</h3>
        <p className="mt-2 text-sm text-[#4A4A4A] leading-relaxed">
          {doctor.bio}
        </p>
      </div>
    </article>
  );
}
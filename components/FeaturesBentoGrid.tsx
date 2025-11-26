import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function FeaturesBentoGrid() {
  return (
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Licensed Medical Professionals",
    description: "Consult with verified clinicians who meet professional standards for delivering remote medical care.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-gradient-to-br from-[#E6F9F0] to-[#2AB3A3]/10 items-center justify-center">
        <svg className="w-16 h-16 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      </div>
    ),
    className: "md:col-span-2",
    icon: (
      <svg className="h-4 w-4 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Encrypted Video Sessions",
    description: "Your audio and video data are protected using standard encryption methods designed to maintain privacy and confidentiality.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-gradient-to-br from-[#E6F9F0] to-[#2AB3A3]/10 items-center justify-center">
        <svg className="w-16 h-16 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <svg className="h-4 w-4 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
    {
    title: "Comprehensive Medical Records",
    description: "Securely store and access your medical history, prescriptions, and consultation notes all in one place.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-gradient-to-br from-[#E6F9F0] to-[#2AB3A3]/10 items-center justify-center">
        <svg className="w-16 h-16 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.5v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3h7.5m-7.5 3h7.5m3-13.5h3.375c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125H18M16.5 5.25h2.25M16.5 8.25h2.25M10.5 5.25h2.25M10.5 8.25h2.25" />
        </svg>
      </div>
    ),
    className: "md:col-span-1",
    icon: (
      <svg className="h-4 w-4 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.5v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3h7.5m-7.5 3h7.5m3-13.5h3.375c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125H18M16.5 5.25h2.25M16.5 8.25h2.25M10.5 5.25h2.25M10.5 8.25h2.25" />
      </svg>
    ),
  },
  {
    title: "Streamlined Appointment Scheduling",
    description: "A clear, minimal workflow that allows patients to choose a doctor and time slot with minimal steps.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-gradient-to-br from-[#E6F9F0] to-[#2AB3A3]/10 items-center justify-center">
        <svg className="w-16 h-16 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </div>
    ),
    className: "md:col-span-2",
    icon: (
      <svg className="h-4 w-4 text-[#2AB3A3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },

];
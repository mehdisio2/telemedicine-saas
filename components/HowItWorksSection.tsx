import { cn } from "@/lib/utils";

export function HowItWorksSection() {
  const steps = [
    {
      step: "Step 1",
      title: "Create an Account",
      description:
        "Sign up quickly with your email to access your personalized dashboard. A simple login ensures your data remains secure and your appointments are easily managed.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      step: "Step 2",
      title: "Book an Appointment",
      description:
        "Choose a doctor, select a convenient date and time, and confirm your booking. The system displays upcoming and past appointments for clarity and organization.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      step: "Step 3",
      title: "Join the Online Consultation",
      description:
        "Connect instantly via a secure video call using our embedded telehealth platform. After your consultation, access medical notes and recommendations directly from your dashboard.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {steps.map((step, index) => (
        <Step key={step.step} {...step} index={index} />
      ))}
    </div>
  );
}

const Step = ({
  step,
  title,
  description,
  icon,
  index,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        index === 0 && "lg:border-l border-gray-200",
        "lg:border-b border-gray-200"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#E6F9F0]/30 to-transparent pointer-events-none" />
      
      <div className="mb-4 relative z-10 px-10 text-[#2AB3A3]">
        {icon}
      </div>
      
      <div className="text-sm font-medium mb-2 relative z-10 px-10 text-[#2AB3A3]">
        {step}
      </div>
      
      <div className="text-xl font-semibold mb-3 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/feature:bg-[#2AB3A3] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#111111]">
          {title}
        </span>
      </div>
      
      <p className="text-sm text-[#4A4A4A] max-w-xs relative z-10 px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
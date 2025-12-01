"use client";

import Link from "next/link";

type Props = {
  title?: string;         // Headline text (default: "Book Appointment")
  subtitle?: string;      // Support text under headline
  buttonLabel?: string;   // CTA button label (default: "Book Now")
  href?: string;          // If provided, renders CTA as a link
  onClick?: () => void;   // If provided, handles button click
};

/**
 * BookAppointmentCTA
 * - Themed gradient card with icon and primary CTA button.
 * - Matches clinical teal theme: #2AB3A3 -> #1F8478.
 */
export function BookAppointmentCTA({
  title = "Book Appointment",
  subtitle = "Schedule your next consultation",
  buttonLabel = "Book Now",
  href,
  onClick,
}: Props) {
  return (
    <section className="bg-gradient-to-br from-[#2AB3A3] to-[#1F8478] rounded-xl shadow-lg p-6 text-white flex flex-col justify-center items-center hover:shadow-xl transition-shadow cursor-pointer">
      {/* Calendar icon (outline, clinical style) */}
      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>

      {/* Title and subtitle */}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-white/90 text-center mb-6 text-sm">{subtitle}</p>

      {/* CTA button: link if href provided, else button with onClick */}
      {href ? (
        <Link
          href={href}
          className="bg-white text-[#2AB3A3] px-8 py-3 rounded-lg font-medium hover:bg-[#F9FAFB] transition-colors"
          aria-label={title}
        >
          {buttonLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="bg-white text-[#2AB3A3] px-8 py-3 rounded-lg font-medium hover:bg-[#F9FAFB] transition-colors"
          aria-label={title}
        >
          {buttonLabel}
        </button>
      )}
    </section>
  );
}
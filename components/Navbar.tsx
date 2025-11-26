"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2AB3A3] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-[#111111]">
              TeleMed
            </span>
          </div>

          {/* Center - Primary Navigation (Hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#home" onClick={(e) => goTo(e, "home")} className="text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" onClick={(e) => goTo(e, "how-it-works")} className="text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              How it Works
            </Link>
            <Link href="#doctors" onClick={(e) => goTo(e, "doctors")} className="text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              Doctors
            </Link>
            <Link href="#contact" onClick={(e) => goTo(e, "contact")} className="text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right - User Actions (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <button className="px-6 py-2.5 text-[#2AB3A3] bg-white border border-[#2AB3A3] rounded-lg font-medium hover:bg-[#E6F9F0] transition-colors h-11">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-2.5 text-white bg-[#2AB3A3] rounded-lg font-medium hover:bg-[#1F8478] transition-colors h-11">
                Book Appointment
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex lg:hidden items-center justify-center h-10 w-10 rounded-lg border border-[#E5E5E5] text-[#111111] hover:bg-[#F3F4F6] transition-colors"
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-[#E5E5E5] bg-white transition-[max-height,opacity] duration-300 ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <Link href="#home" onClick={(e) => goTo(e, "home")} className="py-2 text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" onClick={(e) => goTo(e, "how-it-works")} className="py-2 text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              How it Works
            </Link>
            <Link href="#doctors" onClick={(e) => goTo(e, "doctors")} className="py-2 text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              Doctors
            </Link>
            <Link href="#contact" onClick={(e) => goTo(e, "contact")} className="py-2 text-[#4A4A4A] hover:text-[#2AB3A3] font-medium transition-colors">
              Contact
            </Link>
          </div>

          <div className="pt-2 grid grid-cols-1 gap-2">
            <Link href="/login">
              <button className="w-full px-6 py-2.5 text-[#2AB3A3] bg-white border border-[#2AB3A3] rounded-lg font-medium hover:bg-[#E6F9F0] transition-colors h-11">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full px-6 py-2.5 text-white bg-[#2AB3A3] rounded-lg font-medium hover:bg-[#1F8478] transition-colors h-11">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
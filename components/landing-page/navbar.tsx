import React, { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { THEME } from './theme';
import { PrimaryButton, SecondaryButton } from './ui-components';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: THEME.colors.lightGrey }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: THEME.colors.primaryLight }}
                        >
                            <Activity size={24} style={{ color: THEME.colors.primary }} />
                        </div>
                        <span className="text-xl font-bold tracking-tight" style={{ color: THEME.colors.primaryDark }}>
                            TeleMed<span style={{ color: THEME.colors.primary }}>Care</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-sm font-medium hover:text-teal-600 transition-colors" style={{ color: THEME.colors.darkGrey }}>Find Doctors</a>
                        <a href="#" className="text-sm font-medium hover:text-teal-600 transition-colors" style={{ color: THEME.colors.darkGrey }}>Specialties</a>
                        <a href="#" className="text-sm font-medium hover:text-teal-600 transition-colors" style={{ color: THEME.colors.darkGrey }}>For Patients</a>
                        <a href="#" className="text-sm font-medium hover:text-teal-600 transition-colors" style={{ color: THEME.colors.darkGrey }}>For Doctors</a>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:underline" style={{ color: THEME.colors.primary }}>Log In</Link>
                        <PrimaryButton className="h-10 px-5 text-sm" href="/login">Book Now</PrimaryButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg" style={{ borderColor: THEME.colors.lightGrey }}>
                    <a href="#" className="block py-2 font-medium" style={{ color: THEME.colors.darkGrey }}>Find Doctors</a>
                    <a href="#" className="block py-2 font-medium" style={{ color: THEME.colors.darkGrey }}>Specialties</a>
                    <a href="#" className="block py-2 font-medium" style={{ color: THEME.colors.darkGrey }}>For Patients</a>
                    <hr />
                    <div className="flex flex-col gap-3 pt-2">
                        <SecondaryButton href="/login">Log In</SecondaryButton>
                        <PrimaryButton href="/login">Book Appointment</PrimaryButton>
                    </div>
                </div>
            )}
        </nav>
    );
};

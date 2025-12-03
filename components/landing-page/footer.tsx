import React from 'react';
import { Activity, Shield } from 'lucide-react';
import { THEME } from './theme';

export const Footer = () => (
    <footer className="bg-white border-t pt-16 pb-8" style={{ borderColor: THEME.colors.lightGrey }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                <div className="col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: THEME.colors.primaryLight }}
                        >
                            <Activity size={18} style={{ color: THEME.colors.primary }} />
                        </div>
                        <span className="text-xl font-bold" style={{ color: THEME.colors.primaryDark }}>
                            TeleMed<span style={{ color: THEME.colors.primary }}>Care</span>
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: THEME.colors.mediumGrey }}>
                        Making healthcare accessible, affordable, and easy for everyone. Secure telemedicine consultations at your fingertips.
                    </p>
                    <div className="flex gap-4">
                        {/* Social placeholders */}
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-8 h-8 rounded bg-gray-100 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center transition-colors cursor-pointer">
                                <span className="text-xs">icon</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-6" style={{ color: THEME.colors.black }}>Company</h4>
                    <ul className="space-y-4 text-sm" style={{ color: THEME.colors.mediumGrey }}>
                        <li><a href="#" className="hover:text-teal-600">About Us</a></li>
                        <li><a href="#" className="hover:text-teal-600">Careers</a></li>
                        <li><a href="#" className="hover:text-teal-600">Blog</a></li>
                        <li><a href="#" className="hover:text-teal-600">Press</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-6" style={{ color: THEME.colors.black }}>Services</h4>
                    <ul className="space-y-4 text-sm" style={{ color: THEME.colors.mediumGrey }}>
                        <li><a href="#" className="hover:text-teal-600">Primary Care</a></li>
                        <li><a href="#" className="hover:text-teal-600">Mental Health</a></li>
                        <li><a href="#" className="hover:text-teal-600">Dermatology</a></li>
                        <li><a href="#" className="hover:text-teal-600">Pediatrics</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-6" style={{ color: THEME.colors.black }}>Support</h4>
                    <ul className="space-y-4 text-sm" style={{ color: THEME.colors.mediumGrey }}>
                        <li><a href="#" className="hover:text-teal-600">Help Center</a></li>
                        <li><a href="#" className="hover:text-teal-600">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-teal-600">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-teal-600">Contact Us</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: THEME.colors.lightGrey }}>
                <p className="text-sm" style={{ color: THEME.colors.mediumGrey }}>
                    © 2024 TeleMedCare Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-sm" style={{ color: THEME.colors.mediumGrey }}>
                    <Shield size={16} />
                    <span>HIPAA Compliant & Secure</span>
                </div>
            </div>
        </div>
    </footer>
);

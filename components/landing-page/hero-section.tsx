import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Search, MapPin, Phone, Video, CheckCircle, Stethoscope } from 'lucide-react';
import { THEME } from './theme';
import { PrimaryButton } from './ui-components';

export const HeroSection = () => (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* Left Column: Text */}
                <div className="max-w-2xl">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
                        style={{ backgroundColor: THEME.colors.primaryLight, color: THEME.colors.primaryDark }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-teal-400"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        24/7 Online Consultations
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-semibold leading-tight mb-6" style={{ color: THEME.colors.black }}>
                        Healthcare that <br />
                        fits your <span style={{ color: THEME.colors.primary }}>schedule</span>.
                    </h1>

                    <p className="text-lg mb-8 leading-relaxed" style={{ color: THEME.colors.mediumGrey }}>
                        Connect with top-rated doctors within minutes. Quality medical advice, prescriptions, and follow-ups from the comfort of your home.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <PrimaryButton className="h-12 px-8 text-base shadow-lg shadow-teal-100" href="/login">
                            Find a Doctor
                            <ArrowRight size={18} className="ml-2" />
                        </PrimaryButton>

                        <Link
                            href="/signup/doctor"
                            className="h-12 px-6 rounded-lg font-medium transition-all duration-200 border flex items-center gap-2 hover:bg-teal-50 flex justify-center"
                            style={{
                                backgroundColor: 'white',
                                borderColor: THEME.colors.primary,
                                color: THEME.colors.primary
                            }}
                        >
                            <Stethoscope size={18} />
                            Are you a Practicien
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4 px-4 py-2">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold" style={{ color: THEME.colors.black }}>10k+ Patients</p>
                            <p style={{ color: THEME.colors.mediumGrey }}>trust us monthly</p>
                        </div>
                    </div>

                </div>

                {/* Right Column: Visual */}
                <div className="relative lg:h-[600px] flex items-center justify-center">
                    <div className="relative z-10 w-full max-w-xl">
                        {/* Main Card */}
                        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 relative">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative">
                                <img
                                    src="/images/hero_doctor.jpg"
                                    alt="Doctor Laughing"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-sm font-medium">Live Consultation</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold text-gray-900">Dr. Sarah Jenkins</h4>
                                    <p className="text-sm text-gray-500">Internal Medicine</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200" aria-label="Start phone call">
                                        <Phone size={18} />
                                    </button>
                                    <button className="p-3 rounded-full text-white shadow-lg hover:opacity-90" style={{ backgroundColor: THEME.colors.error }} aria-label="Start video call">
                                        <Video size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Notification Card */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-gray-900">Appointment Confirmed</p>
                                <p className="text-xs text-gray-500">Today, 2:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Background Blob */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 opacity-30 blur-3xl rounded-full"
                        style={{ backgroundColor: THEME.colors.primaryLight }}
                    ></div>
                </div>
            </div>
        </div>
    </section>
);

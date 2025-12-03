import React, { useState } from 'react';
import { Stethoscope, Activity, Shield, User, ChevronRight } from 'lucide-react';
import { THEME } from './theme';
import { SectionHeader } from './ui-components';
import { DoctorCard } from './doctor-card';

export const SpecialtiesSection = () => {
    const [activeTab, setActiveTab] = useState('general');

    const specialties = [
        { id: 'general', label: 'General Practice', icon: Stethoscope },
        { id: 'cardio', label: 'Cardiology', icon: Activity },
        { id: 'derma', label: 'Dermatology', icon: Shield },
        { id: 'pediatric', label: 'Pediatrics', icon: User },
    ];

    const doctors = [
        {
            name: "Dr. Sarah Lin",
            specialty: "General Practitioner",
            rating: 4.9,
            reviews: "1.2k",
            available: true,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
        },
        {
            name: "Dr. James Wilson",
            specialty: "Cardiologist",
            rating: 4.8,
            reviews: "850",
            available: false,
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
        },
        {
            name: "Dr. Emily Chen",
            specialty: "Dermatologist",
            rating: 5.0,
            reviews: "2.1k",
            available: true,
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section className="py-20" style={{ backgroundColor: THEME.colors.offWhite }} id="specialties-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Browse by Specialty"
                    subtitle="Find the right specialist for your needs. Skip the waiting room and connect instantly."
                />

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {specialties.map((spec) => {
                        const Icon = spec.icon;
                        const isActive = activeTab === spec.id;
                        return (
                            <button
                                key={spec.id}
                                onClick={() => setActiveTab(spec.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${isActive ? 'shadow-md scale-105' : 'hover:bg-white hover:shadow-sm'
                                    }`}
                                style={{
                                    backgroundColor: isActive ? THEME.colors.primary : 'transparent',
                                    color: isActive ? 'white' : THEME.colors.darkGrey,
                                    border: isActive ? 'none' : `1px solid ${THEME.colors.lightGrey}`
                                }}
                            >
                                <Icon size={18} />
                                {spec.label}
                            </button>
                        );
                    })}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor, idx) => (
                        <DoctorCard key={idx} {...doctor} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="inline-flex items-center text-sm font-semibold hover:underline" style={{ color: THEME.colors.primary }}>
                        View all specialists <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

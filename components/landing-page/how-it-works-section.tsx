import React from 'react';
import { Calendar, Video, Activity } from 'lucide-react';
import { THEME } from './theme';
import { SectionHeader } from './ui-components';

export const HowItWorksSection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
                title="How It Works"
                subtitle="Getting medical care has never been this simple. Follow these three easy steps."
            />

            <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>

                {[
                    {
                        icon: Calendar,
                        title: "1. Book Appointment",
                        desc: "Choose a doctor and a time slot that works for you."
                    },
                    {
                        icon: Video,
                        title: "2. Connect Online",
                        desc: "Join the video call from home via our secure app."
                    },
                    {
                        icon: Activity,
                        title: "3. Get Treatment",
                        desc: "Receive diagnosis, treatment plans, and prescriptions instantly."
                    }
                ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center bg-white p-4">
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white"
                            style={{ backgroundColor: THEME.colors.primaryLight }}
                        >
                            <step.icon size={32} style={{ color: THEME.colors.primary }} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3" style={{ color: THEME.colors.black }}>{step.title}</h3>
                        <p className="text-base leading-relaxed" style={{ color: THEME.colors.mediumGrey }}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

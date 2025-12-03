import React from 'react';
import { THEME } from './theme';

export const StatsSection = () => (
    <section className="bg-white border-y py-12" style={{ borderColor: THEME.colors.lightGrey }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Active Doctors", value: "2,500+" },
                    { label: "Patient Reviews", value: "48k+" },
                    { label: "Consultations", value: "1M+" },
                    { label: "Years of Service", value: "10+" }
                ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: THEME.colors.primaryDark }}>
                            {stat.value}
                        </div>
                        <div className="text-sm font-medium" style={{ color: THEME.colors.mediumGrey }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

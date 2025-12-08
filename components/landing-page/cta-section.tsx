import Link from 'next/link';
import { THEME } from './theme';

export const CTASection = () => (
    <section className="py-20 px-4">
        <div
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative text-center py-16 px-6 lg:py-24"
            style={{ backgroundColor: THEME.colors.primary }}
        >
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Ready to feel better?
                </h2>
                <p className="text-teal-50 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Join thousands of patients who trust TeleMedCare for their daily health needs. No waiting rooms, just care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/login"
                        className="px-8 py-4 bg-white text-teal-600 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg inline-block"
                    >
                        Book an Appointment
                    </Link>
                    <button className="px-8 py-4 bg-teal-700 text-white border border-teal-600 rounded-lg font-semibold text-lg hover:bg-teal-800 transition-colors">
                        Download App
                    </button>
                </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
    </section>
);

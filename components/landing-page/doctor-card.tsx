import React from 'react';
import { Star, User, MapPin } from 'lucide-react';
import { THEME } from './theme';
import { SecondaryButton } from './ui-components';

interface DoctorCardProps {
    name: string;
    specialty: string;
    rating: number;
    reviews: string;
    image: string;
    available: boolean;
}

export const DoctorCard = ({ name, specialty, rating, reviews, image, available }: DoctorCardProps) => (
    <div
        className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group"
        style={{
            border: `1px solid ${THEME.colors.lightGrey}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
        }}
    >
        <div className="relative h-64 overflow-hidden bg-gray-100">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {available && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: THEME.colors.success }}></div>
                    <span className="text-xs font-medium" style={{ color: THEME.colors.success }}>Available Now</span>
                </div>
            )}
        </div>
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: THEME.colors.black }}>{name}</h3>
                    <p className="text-sm mb-3" style={{ color: THEME.colors.primary }}>{specialty}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">{rating}</span>
                </div>
            </div>

            <div className="flex items-center gap-4 text-sm mb-6" style={{ color: THEME.colors.mediumGrey }}>
                <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{reviews} patients</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>Remote</span>
                </div>
            </div>

            <SecondaryButton className="w-full h-10 text-sm">Book Appointment</SecondaryButton>
        </div>
    </div>
);

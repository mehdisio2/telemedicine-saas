"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Heart } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "@/components/booking-modal";

export type DoctorCardProps = {
  id: string; // Add the doctor's UUID
  full_name: string;
  specialty: string;
  bio?: string;            // doctor's bio/description
  rating?: number;          // e.g. 5.0
  isAvailable?: boolean;    // availability badge
  city?: string;            // e.g. "Minneapolis, MN"
  duration?: string;        // e.g. "30 Min"
  fee?: number;             // e.g. 650
  photoUrl?: string;        // optional photo
};

export function DoctorCard({
  id,
  full_name,
  specialty,
  bio,
  rating = 5.0,
  isAvailable = true,
  city = "City, Country",
  duration = "30 Min",
  fee = 650,
  photoUrl = "/images/doctor-placeholder.jpg",
}: DoctorCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {/* Top image */}
        <div className="relative h-64 bg-gray-100">
          <Image
            src={photoUrl}
            alt={`${full_name} photo`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Rating pill */}
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            ⭐ {rating.toFixed(1)}
          </div>
          {/* Favorite icon (non-interactive placeholder) */}
          <button
            type="button"
            aria-label="favorite"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-teal-600"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Top row: specialty + availability */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-teal-700">{
              specialty
            }</span>
            {isAvailable ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                Available
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                Unavailable
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-900">{full_name}</h3>

          {/* Bio */}
          {bio && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{bio}</p>
          )}

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              {city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              {duration}
            </span>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-100" />

          {/* Fees + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Consultation Fees</p>
              <p className="text-xl font-semibold text-orange-600">${fee}</p>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#2AB3A3] text-white hover:bg-[#1F8478] transition-colors font-medium"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        doctorId={id}
        doctorName={full_name}
        consultationFee={fee}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}

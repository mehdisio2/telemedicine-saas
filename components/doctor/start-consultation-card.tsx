"use client";

import Link from "next/link";
import { Video } from "lucide-react";

type StartConsultationCardProps = {
  roomId: string;
  isActive?: boolean;
};

export function StartConsultationCard({ roomId, isActive = true }: StartConsultationCardProps) {
  if (!isActive) return null;

  return (
    <section className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Video className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Ready to Start Consultation</h3>
            <p className="text-sm text-teal-100">
              Room ID: <span className="font-mono">{roomId}</span>
            </p>
          </div>
        </div>
        <Link
          href={`/doctor/video-call/${roomId}`}
          className="bg-white text-teal-600 hover:bg-teal-50 font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
        >
          Start Consultation
        </Link>
      </div>
    </section>
  );
}
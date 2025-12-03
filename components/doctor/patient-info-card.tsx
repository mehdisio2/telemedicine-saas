"use client";

import { User } from "lucide-react";

interface Patient {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    bloodType: string;
}

interface PatientInfoCardProps {
    patient: Patient;
}

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Information</h3>

            <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{patient.email}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{patient.phone}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                    <p className="text-sm font-semibold text-gray-900">{patient.bloodType}</p>
                </div>
            </div>
        </section>
    );
}

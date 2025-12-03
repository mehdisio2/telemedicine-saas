"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AvailabilityStatus = "available" | "unavailable" | "offline";

export interface DoctorData {
    name: string;
    license_number: string;
    specialty: string;
    avatar?: string;
}

interface DoctorContextType {
    availability: AvailabilityStatus;
    setAvailability: (status: AvailabilityStatus) => void;
    doctorData: DoctorData;
    setDoctorData: (data: DoctorData) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorProviderProps {
    children: ReactNode;
    initialDoctorData?: DoctorData;
}

export function DoctorProvider({ children, initialDoctorData }: DoctorProviderProps) {
    const [availability, setAvailability] = useState<AvailabilityStatus>("available");
    const [doctorData, setDoctorData] = useState<DoctorData>(initialDoctorData || {
        name: "Dr. John Doe",
        license_number: "BDS, MDS",
        specialty: "Cardiologist",
    });

    return (
        <DoctorContext.Provider value={{ availability, setAvailability, doctorData, setDoctorData }}>
            {children}
        </DoctorContext.Provider>
    );
}

export function useDoctor() {
    const context = useContext(DoctorContext);
    if (context === undefined) {
        throw new Error("useDoctor must be used within a DoctorProvider");
    }
    return context;
}

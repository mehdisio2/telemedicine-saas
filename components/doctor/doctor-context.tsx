"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AvailabilityStatus = "available" | "unavailable" | "offline";

interface DoctorContextType {
    availability: AvailabilityStatus;
    setAvailability: (status: AvailabilityStatus) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export function DoctorProvider({ children }: { children: ReactNode }) {
    const [availability, setAvailability] = useState<AvailabilityStatus>("available");

    return (
        <DoctorContext.Provider value={{ availability, setAvailability }}>
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

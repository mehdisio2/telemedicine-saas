"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface PatientData {
    name: string;
    id: string;
    avatar?: string;
    email?: string;
}

interface PatientContextType {
    patientData: PatientData;
    setPatientData: (data: PatientData) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientProviderProps {
    children: ReactNode;
    initialPatientData?: PatientData;
}

export function PatientProvider({ children, initialPatientData }: PatientProviderProps) {
    const [patientData, setPatientData] = useState<PatientData>(initialPatientData || {
        name: "John Doe",
        id: "#12345",
    });

    return (
        <PatientContext.Provider value={{ patientData, setPatientData }}>
            {children}
        </PatientContext.Provider>
    );
}

export function usePatient() {
    const context = useContext(PatientContext);
    if (context === undefined) {
        throw new Error("usePatient must be used within a PatientProvider");
    }
    return context;
}

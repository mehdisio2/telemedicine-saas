"use client";
import React, { FC, useState } from "react";

type Filters = {
    specialty: string;
    date: string; // ISO date (YYYY-MM-DD) or empty string
};

type Props = {
    specialties?: string[]; // suggestions for specialty
    onSearch?: (filters: Filters) => void;
    className?: string;
};

const defaultSpecialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
];

const SearchFilter: FC<Props> = ({ specialties = defaultSpecialties, onSearch, className }) => {
    const [specialty, setSpecialty] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const handleSearch = () => {
        const filters: Filters = { specialty: specialty.trim(), date };
        onSearch?.(filters);
    };

    const handleClear = () => {
        setSpecialty("");
        setDate("");
        onSearch?.({ specialty: "", date: "" });
    };

    return (
        <form
            className={`flex flex-wrap items-end gap-4 p-5 bg-white border border-[#E5E5E5] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className ?? ""}`}
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="specialty-input" className="text-sm font-medium text-[#4A4A4A]">
                    Doctor specialty
                </label>
                <input
                    id="specialty-input"
                    list="specialties"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Cardiology"
                    className="px-3 py-2 h-10 min-w-[180px] border border-[#E5E5E5] rounded-lg bg-white text-[#111111] placeholder:text-[#888888] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3]"
                />
                <datalist id="specialties">
                    {specialties.map((s) => (
                        <option value={s} key={s} />
                    ))}
                </datalist>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="date-input" className="text-sm font-medium text-[#4A4A4A]">
                    Appointment date
                </label>
                <input
                    id="date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-3 py-2 h-10 border border-[#E5E5E5] rounded-lg bg-white text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:border-[#2AB3A3]"
                />
            </div>

            <div className="ml-auto flex gap-3">
                <button
                    type="submit"
                    className="px-4 py-2 h-10 rounded-lg font-medium text-white bg-[#2AB3A3] hover:bg-[#1F8478] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:ring-offset-2 transition-colors"
                >
                    Search
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 h-10 rounded-lg font-medium border border-[#2AB3A3] bg-white text-[#2AB3A3] hover:bg-[#E6F9F0] focus:outline-none focus:ring-2 focus:ring-[#2AB3A3] focus:ring-offset-2 transition-colors"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchFilter;
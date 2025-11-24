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
            className={`flex flex-wrap items-center gap-3 p-3 border-gray-800 border-2 rounded-md ${className ?? ""}`}
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >
            <div className="flex flex-col">
                <label htmlFor="specialty-input" className="text-sm mb-1">
                    Doctor specialty
                </label>
                <input
                    id="specialty-input"
                    list="specialties"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Cardiology"
                    className="px-3 py-2 min-w-[180px] border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current"
                />
                <datalist id="specialties">
                    {specialties.map((s) => (
                        <option value={s} key={s} />
                    ))}
                </datalist>
            </div>

            <div className="flex flex-col">
                <label htmlFor="date-input" className="text-sm mb-1">
                    Appointment date
                </label>
                <input
                    id="date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current"
                />
            </div>

            <div className="ml-auto flex gap-2">
                <button
                    type="submit"
                    className="px-3 py-2 rounded-md font-semibold text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-600"
                >
                    Search
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-2 rounded-md font-semibold border bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchFilter;
"use client";

import { useState } from "react";
import { Search, Filter, Calendar, Clock, User, ChevronDown, X } from "lucide-react";
import Link from "next/link";

type Appointment = {
    id: string;
    patient: {
        name: string;
        age: number;
        gender: string;
    };
    date: string;
    time: string;
    datetime: string;
    status: string;
    reason: string;
    duration: string;
};

type FilterStatus = "all" | "scheduled" | "completed";
type FilterDate = "all" | "today" | "week" | "month" | "range";

export function AppointmentsList({ appointments }: { appointments: Appointment[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
    const [dateFilter, setDateFilter] = useState<FilterDate>("all");
    const [showFilters, setShowFilters] = useState(false);

    // Filter and sort appointments
    const filteredAppointments = appointments
        .filter(apt => {
            // Search filter
            const matchesSearch = apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            const matchesStatus = statusFilter === "all" || apt.status === statusFilter;

            // Date filter (simplified - you'd implement proper date logic)
            const matchesDate = dateFilter === "all" || true; // Implement date filtering logic

            return matchesSearch && matchesStatus && matchesDate;
        })
        .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

    const getStatusBadge = (status: string) => {
        const badges = {
            scheduled: {
                className: "bg-teal-50 text-teal-700 border-teal-200",
                text: "Scheduled"
            },
            completed: {
                className: "bg-blue-50 text-blue-700 border-blue-200",
                text: "Completed"
            },
            confirmed: {
                className: "bg-green-50 text-green-700 border-green-200",
                text: "Confirmed"
            },
            cancelled: {
                className: "bg-red-50 text-red-700 border-red-200",
                text: "Cancelled"
            }
        };

        const badge = badges[status as keyof typeof badges] || badges.scheduled;

        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
                {badge.text}
            </span>
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setDateFilter("all");
    };

    const hasActiveFilters = searchQuery || statusFilter !== "all" || dateFilter !== "all";

    return (
        <>
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
                {/* Search Bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patient name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Filters</span>
                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                                >
                                    <option value="all">All Status</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            {/* Date Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value as FilterDate)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                                >
                                    <option value="all">All Dates</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="range">Date Range</option>
                                </select>
                            </div>

                            {/* Sort (always newest to oldest for now) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                                    disabled
                                >
                                    <option>Date (Newest → Oldest)</option>
                                </select>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                            >
                                <X className="w-4 h-4" />
                                Clear all filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredAppointments.length}</span> appointment{filteredAppointments.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <Link
                            key={appointment.id}
                            href={`/doctor/appointments/${appointment.id}`}
                            className="block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
                        >
                            <div className="flex items-start justify-between">
                                {/* Left side - Patient & Appointment Info */}
                                <div className="flex items-start gap-4 flex-1">
                                    {/* Patient Avatar */}
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="w-6 h-6 text-teal-600" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{appointment.patient.name}</h3>
                                            {getStatusBadge(appointment.status)}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span>{appointment.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span>{appointment.time}</span>
                                            </div>
                                            <div className="text-gray-500">
                                                {appointment.duration}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-700 mt-2">
                                            <span className="font-medium">Reason:</span> {appointment.reason}
                                        </p>
                                    </div>
                                </div>

                                {/* Right side - Patient Info */}
                                <div className="text-right ml-4">
                                    <p className="text-sm text-gray-500">{appointment.patient.age} years</p>
                                    <p className="text-sm text-gray-500">{appointment.patient.gender}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                            <p className="text-gray-600">
                                {hasActiveFilters
                                    ? "Try adjusting your filters to see more results."
                                    : "You don't have any appointments scheduled yet."
                                }
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

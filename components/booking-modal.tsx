"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface BookingModalProps {
    doctorId: string;
    doctorName: string;
    consultationFee: number;
    isOpen: boolean;
    onClose: () => void;
}

const TIME_SLOTS = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"
];

export function BookingModal({
    doctorId,
    doctorName,
    consultationFee,
    isOpen,
    onClose
}: BookingModalProps) {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime) {
            setError("Please select both a date and a time.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Combine date and time into ISO string
            const datetime = new Date(`${selectedDate}T${selectedTime}`).toISOString();

            const response = await fetch("/api/apointments/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    datetime,
                    description,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to book appointment");
            }

            setSuccess(true);
            setTimeout(() => {
                onClose();
                // Reset state after closing
                setTimeout(() => {
                    setSuccess(false);
                    setSelectedDate("");
                    setSelectedTime("");
                    setDescription("");
                }, 300);
            }, 1500);

        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] bg-white text-[#111111]">
                <DialogHeader>
                    <DialogTitle>Book Appointment with Dr. {doctorName}</DialogTitle>
                    <DialogDescription>
                        Select a date and time for your consultation.
                    </DialogDescription>
                </DialogHeader>

                {!success ? (
                    <div className="grid gap-6 py-4">
                        {/* Date Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                                <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Time
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {TIME_SLOTS.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`
                      px-3 py-1.5 text-sm rounded-full border transition-colors
                      ${selectedTime === time
                                                ? "bg-[#2AB3A3] text-white border-[#2AB3A3]"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-[#2AB3A3] hover:text-[#2AB3A3]"
                                            }
                    `}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Reason for Visit */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Reason for visit (Optional)
                            </label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                placeholder="Briefly describe your symptoms or reason for consultation..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Summary & Error */}
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-sm text-gray-500">Consultation Fee</span>
                            <span className="font-semibold text-[#111111]">${consultationFee}</span>
                        </div>

                        {error && (
                            <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Booking Confirmed!</h3>
                            <p className="text-sm text-gray-500">Your appointment has been successfully scheduled.</p>
                        </div>
                    </div>
                )}

                {!success && (
                    <DialogFooter>
                        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={isSubmitting || !selectedDate || !selectedTime}
                            className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white"
                        >
                            {isSubmitting ? "Confirming..." : "Confirm Booking"}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}

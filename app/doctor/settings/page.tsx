"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, Save } from "lucide-react";
import { DoctorSidebar } from "@/components/doctor/sidebar";
import { useDoctor } from "@/components/doctor/doctor-context";

type Availability = {
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function DoctorSettingsPage() {
    const supabase = createClient();
    const { doctorData, setDoctorData } = useDoctor();
    const [loading, setLoading] = useState(true);

    // Profile State
    const [profile, setProfile] = useState({
        name: doctorData.name,
        specialty: doctorData.specialty,
        avatar: doctorData.avatar || "",
    });
    const [uploading, setUploading] = useState(false);

    // Availability State
    const [availability, setAvailability] = useState<Availability[]>([]);

    // Password State
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    // Status Messages
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch Profile (Optional refresh, but we have context)
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // We can rely on context for initial render, but let's fetch availability
            // and maybe refresh profile if needed.
            // For now, let's just update profile state if context updates or if we fetch new data.

            // Fetch Availability

            // Fetch Availability
            const { data: availData } = await supabase
                .from("doctor_availability")
                .select("*")
                .eq("doctor_id", user.id);

            // Initialize availability with defaults if missing
            const initialAvailability = DAYS.map(day => {
                const existing = availData?.find(d => d.day_of_week.toLowerCase() === day.toLowerCase());
                return existing ? {
                    day_of_week: day,
                    start_time: existing.start_time,
                    end_time: existing.end_time,
                    is_active: existing.is_active
                } : {
                    day_of_week: day,
                    start_time: "09:00",
                    end_time: "17:00",
                    is_active: false // Default to off if not set
                };
            });

            setAvailability(initialAvailability);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, {
                    upsert: true
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            setProfile(prev => ({ ...prev, avatar: publicUrl }));

        } catch (error: any) {
            setMessage({ type: "error", text: error.message });
        } finally {
            setUploading(false);
        }
    };

    const saveProfile = async () => {
        try {
            const res = await fetch("/api/doctor/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: profile.name,
                    specialty: profile.specialty,
                    image_url: profile.avatar
                }),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            // Update Context
            setDoctorData({
                ...doctorData,
                name: profile.name,
                specialty: profile.specialty,
                avatar: profile.avatar
            });

            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile." });
        }
    };

    const saveAvailability = async () => {
        try {
            const res = await fetch("/api/doctor/availability", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(availability),
            });

            if (!res.ok) throw new Error("Failed to update availability");

            setMessage({ type: "success", text: "Schedule updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update schedule." });
        }
    };

    const updatePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        try {
            const res = await fetch("/api/doctor/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: passwords.new,
                    currentPassword: passwords.current
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update password");

            setMessage({ type: "success", text: "Password updated successfully!" });
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (error: any) {
            setMessage({ type: "error", text: error.message });
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-[#2AB3A3]" /></div>;
    }

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <DoctorSidebar />
            <main className="flex-1 p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h1 className="text-3xl font-semibold text-[#111111]">Settings</h1>

                    {message && (
                        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Card 1: Profile Settings */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-200">
                                    <Image
                                        src={profile.avatar || "/images/doctor-avatar.jpg"}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <label className="cursor-pointer text-sm font-medium text-[#2AB3A3] hover:text-[#1F8478] flex items-center gap-2">
                                    <Camera className="w-4 h-4" />
                                    Change Photo
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            </div>

                            {/* Fields */}
                            <div className="flex-1 space-y-4 w-full">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="specialty">Specialty</Label>
                                    <Input
                                        id="specialty"
                                        value={profile.specialty}
                                        onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                                    />
                                </div>
                                <Button onClick={saveProfile} className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Profile Changes
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Weekly Availability */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Weekly Availability</h2>
                            <Button onClick={saveAvailability} className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white">
                                Save Schedule
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {availability.map((day, index) => (
                                <div key={day.day_of_week} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                    <div className="flex items-center gap-4 w-32">
                                        <input
                                            type="checkbox"
                                            checked={day.is_active}
                                            onChange={(e) => {
                                                const newAvail = [...availability];
                                                newAvail[index].is_active = e.target.checked;
                                                setAvailability(newAvail);
                                            }}
                                            className="w-4 h-4 text-[#2AB3A3] rounded focus:ring-[#2AB3A3]"
                                        />
                                        <span className={`font-medium ${day.is_active ? "text-gray-900" : "text-gray-400"}`}>
                                            {day.day_of_week}
                                        </span>
                                    </div>

                                    {day.is_active ? (
                                        <div className="flex items-center gap-3">
                                            <Input
                                                type="time"
                                                value={day.start_time}
                                                onChange={(e) => {
                                                    const newAvail = [...availability];
                                                    newAvail[index].start_time = e.target.value;
                                                    setAvailability(newAvail);
                                                }}
                                                className="w-32"
                                            />
                                            <span className="text-gray-400">-</span>
                                            <Input
                                                type="time"
                                                value={day.end_time}
                                                onChange={(e) => {
                                                    const newAvail = [...availability];
                                                    newAvail[index].end_time = e.target.value;
                                                    setAvailability(newAvail);
                                                }}
                                                className="w-32"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">Day Off</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Security */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">Security</h2>
                        <div className="space-y-4 max-w-md">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                />
                            </div>
                            <Button onClick={updatePassword} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                Update Password
                            </Button>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, Save } from "lucide-react";
import { usePatient } from "@/components/patient/patient-context";
import { PatientSidebar } from "@/components/patient/sidebar";

export default function PatientSettingsPage() {
    const supabase = createClient();
    const { patientData, setPatientData } = usePatient();
    const [loading, setLoading] = useState(true);

    // Profile State
    const [profile, setProfile] = useState({
        name: patientData.name,
        email: patientData.email || "",
        avatar: patientData.avatar || "",
    });
    const [uploading, setUploading] = useState(false);

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
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Fetch patient profile
            const { data: patientProfile } = await supabase
                .from("patients")
                .select("full_name, image_url")
                .eq("id", user.id)
                .single();

            if (patientProfile) {
                setProfile(prev => ({
                    ...prev,
                    name: patientProfile.full_name || prev.name,
                    email: user.email || "",
                    avatar: patientProfile.image_url || ""
                }));
            } else {
                setProfile(prev => ({
                    ...prev,
                    email: user.email || ""
                }));
            }
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
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            const { error } = await supabase
                .from("patients")
                .update({
                    full_name: profile.name,
                    image_url: profile.avatar
                })
                .eq("id", user.id);

            if (error) throw new Error("Failed to update profile");

            // Update Context
            setPatientData({
                ...patientData,
                name: profile.name,
                avatar: profile.avatar
            });

            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile." });
        }
    };

    const updatePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        if (passwords.new.length < 6) {
            setMessage({ type: "error", text: "Password must be at least 6 characters." });
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: passwords.new
            });

            if (error) throw new Error(error.message);

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
            <PatientSidebar />
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
                                        src={profile.avatar || "/images/patient-avatar.jpg"}
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="bg-gray-50 text-gray-500"
                                    />
                                    <p className="text-xs text-gray-400">Email cannot be changed</p>
                                </div>
                                <Button onClick={saveProfile} className="bg-[#2AB3A3] hover:bg-[#1F8478] text-white">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Profile Changes
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Security */}
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
            </main>
        </div>
    );
}

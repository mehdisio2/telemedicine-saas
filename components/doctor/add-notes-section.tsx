"use client";

import { useState } from "react";
import { Edit3, Save } from "lucide-react";

export function AddNotesSection() {
    const [currentNotes, setCurrentNotes] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveNotes = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Saving notes:", currentNotes);
        setIsSaving(false);
        // Show success message or redirect
    };

    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-2 mb-4">
                <Edit3 className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">Add Medical Notes</h2>
            </div>

            <div className="space-y-4">
                <textarea
                    value={currentNotes}
                    onChange={(e) => setCurrentNotes(e.target.value)}
                    placeholder="Enter your medical notes here... Include observations, diagnosis, treatment plan, prescriptions, and follow-up recommendations."
                    className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-gray-900"
                />

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        {currentNotes.length} characters
                    </p>
                    <button
                        onClick={handleSaveNotes}
                        disabled={!currentNotes.trim() || isSaving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save Notes"}
                    </button>
                </div>
            </div>
        </section>
    );
}

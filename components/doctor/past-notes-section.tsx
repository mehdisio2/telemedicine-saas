"use client";

import { FileText, Calendar } from "lucide-react";

interface Note {
    date: string;
    note: string;
}

interface PastNotesSectionProps {
    notes: Note[];
}

export function PastNotesSection({ notes }: PastNotesSectionProps) {
    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">Past Medical Notes</h2>
            </div>

            {notes.length > 0 ? (
                <div className="space-y-4">
                    {notes.map((note, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <p className="text-sm font-semibold text-gray-900">{note.date}</p>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{note.note}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
                    <p className="text-gray-500">No previous notes available.</p>
                    <p className="text-sm text-gray-400 mt-1">This is the patient's first visit.</p>
                </div>
            )}
        </section>
    );
}

import React, { useState } from 'react';
import { Bot, X, Loader, Sparkles, Activity, AlertCircle, Clock } from 'lucide-react';
import { THEME } from './theme';
import { PrimaryButton, SecondaryButton } from './ui-components';

interface AIModalProps {
    onClose: () => void;
}

export const AIModal = ({ onClose }: AIModalProps) => {
    const [symptomInput, setSymptomInput] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeSymptoms = async () => {
        if (!symptomInput.trim()) return;

        setIsAnalyzing(true);
        setAiAnalysis(null);
        const apiKey = ""; // System provides this at runtime

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are a medical triage assistant for a telemedicine app. 
                Analyze the user's described symptoms.
                1. Recommend the SINGLE most appropriate specialist (e.g. Cardiologist, Dermatologist, General Practitioner, Pediatrician, Orthopedist).
                2. Provide a 1-sentence explanation of why.
                3. Determine urgency (Routine, Next 24 Hours, Immediate).
                
                Return ONLY valid JSON:
                { "specialty": "string", "reasoning": "string", "urgency": "string" }
                
                User Symptoms: "${symptomInput}"`
                            }]
                        }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                }
            );

            const data = await response.json();
            const result = JSON.parse(data.candidates[0].content.parts[0].text);
            setAiAnalysis(result);
        } catch (error) {
            console.error("AI Error:", error);
            setAiAnalysis({
                specialty: "General Practitioner",
                reasoning: "We couldn't analyze the specific symptoms, but a GP is the best starting point.",
                urgency: "Routine"
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                style={{ border: `1px solid ${THEME.colors.lightGrey}` }}
            >
                {/* Modal Header */}
                <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: THEME.colors.lightGrey, backgroundColor: THEME.colors.offWhite }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-teal-100 text-teal-600">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg" style={{ color: THEME.colors.black }}>AI Specialist Matcher</h3>
                            <p className="text-xs text-gray-500">Powered by Gemini • Not medical advice</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {!aiAnalysis ? (
                        <>
                            <label className="block text-sm font-medium mb-2" style={{ color: THEME.colors.darkGrey }}>
                                Describe your symptoms
                            </label>
                            <textarea
                                value={symptomInput}
                                onChange={(e) => setSymptomInput(e.target.value)}
                                className="w-full h-32 p-4 rounded-xl border resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                style={{ borderColor: THEME.colors.lightGrey, backgroundColor: THEME.colors.offWhite }}
                                placeholder="E.g., I have a sharp pain in my lower back that gets worse when I bend over..."
                            />

                            <div className="mt-6">
                                <PrimaryButton
                                    onClick={analyzeSymptoms}
                                    className={`w-full ${isAnalyzing ? 'opacity-80 cursor-not-allowed' : ''}`}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader size={20} className="animate-spin mr-2" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} className="mr-2" />
                                            Find Specialist
                                        </>
                                    )}
                                </PrimaryButton>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            {/* Result Card */}
                            <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                        <Activity className="text-teal-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-teal-800 font-medium mb-1">Recommended Specialist</p>
                                        <h4 className="text-xl font-bold text-teal-900">{aiAnalysis.specialty}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                    <AlertCircle size={20} className="text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Analysis</p>
                                        <p className="text-sm text-gray-600">{aiAnalysis.reasoning}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Clock size={20} className="text-gray-400" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-900">Suggested Urgency: </span>
                                        <span className={`text-sm font-semibold ${aiAnalysis.urgency.toLowerCase().includes('immediate') ? 'text-red-600' :
                                            aiAnalysis.urgency.toLowerCase().includes('24') ? 'text-orange-500' : 'text-green-600'
                                            }`}>
                                            {aiAnalysis.urgency}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <SecondaryButton onClick={() => setAiAnalysis(null)}>Try Again</SecondaryButton>
                                <PrimaryButton onClick={() => {
                                    onClose();
                                    window.scrollTo({ top: document.getElementById('specialties-section')?.offsetTop || 0, behavior: 'smooth' });
                                }}>
                                    View Doctors
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

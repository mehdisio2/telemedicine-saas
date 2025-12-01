"use client";
import React from "react";
import { Heart, Thermometer, Droplet, Activity, Scale, Copy } from "lucide-react";

/**
 * PatientHealthRecordCard
 * - Renders the "Latest Health Records" card using the project's medical theme.
 * - Accepts an array of records with label, value, and date.
 */
export type HealthRecord = {
  label: string;   // e.g. "Blood Pressure"
  value: string;   // e.g. "120/80"
  date?: string;    // e.g. "November 28, 2025"
  icon?: string;
  percentage?: string;
  percentageColor?: string;
};

type Props = {
  title?: string;          // Card title (defaults to "Latest Health Records")
  records: HealthRecord[]; // Records to display
  overallHealth?: number; // 0-100
  lastVisitDate?: string;
};

export function PatientHealthRecordsCard({ 
  title = "Health Records", 
  records,
  overallHealth = 95,
  lastVisitDate = "25 Mar 2025"
}: Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      heart: <Heart className="w-5 h-5 text-orange-500" fill="currentColor" />,
      thermometer: <Thermometer className="w-5 h-5 text-amber-500" />,
      droplet: <Droplet className="w-5 h-5 text-blue-500" fill="currentColor" />,
      activity: <Activity className="w-5 h-5 text-purple-500" />,
      scale: <Scale className="w-5 h-5 text-purple-500" />
    };
    return icons[iconName] || <Activity className="w-5 h-5" />;
  };

  return (
    // Card container - white card with subtle border and shadow per theme
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
      {/* Card header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left side - Health Metrics Grid */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {records.map((r, i) => (
              <div key={`${r.label}-${i}`} className="space-y-2">
                <div className="flex items-center gap-2">
                  {r.icon && getIcon(r.icon)}
                  <p className="text-sm font-medium text-gray-500">{r.label}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    {r.value}
                  </span>
                  {r.percentage && (
                    <span className={`text-sm font-semibold ${r.percentageColor || 'text-green-600'}`}>
                      {r.percentage}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Report Footer */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Report generated on last visit : {lastVisitDate}</span>
              <button 
                className="ml-1 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors"
                aria-label="Copy report"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Overall Report Circle */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-100 lg:min-w-[320px]">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Report</h3>
          
          {/* Circular Progress Chart */}
          <div className="relative w-56 h-56 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="6"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#10B981"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${overallHealth * 2.64} 264`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 mb-1">Last Visit</p>
              <p className="text-base font-semibold text-gray-700">{lastVisitDate}</p>
            </div>
          </div>

          {/* Health status text */}
          <div className="text-center">
            <p className="text-gray-600">
              Your health is{" "}
              <span className="font-bold text-gray-900 text-lg">
                {overallHealth}% Normal
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

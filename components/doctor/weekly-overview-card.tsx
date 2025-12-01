type WeeklyOverviewCardProps = {
  title?: string;
  heightClass?: string; // e.g., "h-64"
};

export function WeeklyOverviewCard({
  title = "Weekly Overview",
  heightClass = "h-64",
}: WeeklyOverviewCardProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-[#111111] mb-4">{title}</h2>
      <div className={`${heightClass} bg-gray-50 rounded-lg flex items-center justify-center`}>
        {/* Chart component goes here (e.g., Recharts, Chart.js) */}
        <p className="text-[#888888] text-sm">Chart: Appointments per day</p>
      </div>
    </section>
  );
}
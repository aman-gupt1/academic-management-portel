export default function RecentActivities() {
  const activities = [
    "New student added",
    "Physics test created",
    "Attendance updated",
    "Results published",
    "Teacher assigned to Class 10",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <div className="h-3 w-3 rounded-full bg-indigo-600" />

            <p className="text-slate-600">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function RecentTeachers() {
  const teachers = [
    "Mr. Sharma",
    "Mrs. Verma",
    "Mr. Singh",
    "Mrs. Gupta",
    "Mr. Khan",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Teachers
      </h2>

      <div className="space-y-3">
        {teachers.map((teacher) => (
          <div
            key={teacher}
            className="rounded-xl bg-slate-50 p-3"
          >
            {teacher}
          </div>
        ))}
      </div>
    </div>
  );
}
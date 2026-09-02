export default function RecentStudents() {
  const students = [
    "Aman Gupta",
    "Rahul Kumar",
    "Priya Singh",
    "Neha Sharma",
    "Rohit Verma",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Students
      </h2>

      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student}
            className="rounded-xl bg-slate-50 p-3"
          >
            {student}
          </div>
        ))}
      </div>
    </div>
  );
}
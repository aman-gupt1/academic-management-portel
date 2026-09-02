import {
  UserPlus,
  GraduationCap,
  School,
  FileText,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      label: "Add Student",
      icon: UserPlus,
    },
    {
      label: "Add Teacher",
      icon: GraduationCap,
    },
    {
      label: "Create Class",
      icon: School,
    },
    {
      label: "Create Test",
      icon: FileText,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-500 hover:bg-indigo-50"
            >
              <Icon
                size={20}
                className="text-indigo-600"
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
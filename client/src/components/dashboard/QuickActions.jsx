import {
  UserPlus,
  GraduationCap,
  School,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Add Student",
      icon: UserPlus,
      path: "/students",
    },
    {
      label: "Add Teacher",
      icon: GraduationCap,
      path: "/teachers",
    },
    {
      label: "Create Class",
      icon: School,
      path: "/classes",
    },
    {
      label: "Create Test",
      icon: FileText,
      path: "/tests",
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
              onClick={() => navigate(item.path)}
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
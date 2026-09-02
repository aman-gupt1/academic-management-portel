import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Search,
  Download,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock3,
  Percent,
} from "lucide-react";

export default function Attendance() {
  const [search, setSearch] = useState("");

  const attendanceData = [
    {
      id: 1,
      name: "Aman Gupta",
      class: "Class 10-A",
      date: "2026-09-12",
      status: "Present",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      class: "Class 10-A",
      date: "2026-09-12",
      status: "Absent",
    },
    {
      id: 3,
      name: "Priya Sharma",
      class: "Class 11-B",
      date: "2026-09-12",
      status: "Leave",
    },
    {
      id: 4,
      name: "Ankit Singh",
      class: "Class 12-A",
      date: "2026-09-12",
      status: "Present",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance Management"
        subtitle="Track and manage student attendance."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Mark Attendance
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Present"
          value="1180"
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Absent"
          value="45"
          icon={<XCircle size={22} />}
        />

        <StatCard
          title="Leave"
          value="25"
          icon={<Clock3 size={22} />}
        />

        <StatCard
          title="Attendance Rate"
          value="94%"
          icon={<Percent size={22} />}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Classes</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>

            <input
              type="date"
              className="rounded-xl border border-slate-200 px-4 py-2"
            />

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.class}
                  </td>

                  <td className="px-6 py-4">
                    {item.date}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            Showing 1-4 of 1250 records
          </p>

          <div className="flex gap-2">
            <button className="rounded-lg border px-3 py-1.5">
              Previous
            </button>

            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white">
              1
            </button>

            <button className="rounded-lg border px-3 py-1.5">
              2
            </button>

            <button className="rounded-lg border px-3 py-1.5">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>

      <h3 className="text-sm text-slate-500">
        {title}
      </h3>

      <p className="mt-1 text-2xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}
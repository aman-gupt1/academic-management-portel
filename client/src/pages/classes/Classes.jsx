import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  School,
  Users,
  DoorOpen,
  CheckCircle,
} from "lucide-react";

export default function Classes() {
  const [search, setSearch] = useState("");

  const classes = [
    {
      id: 1,
      className: "Class 10",
      section: "A",
      teacher: "Rahul Sharma",
      students: 42,
      room: "R-101",
      status: "Active",
    },
    {
      id: 2,
      className: "Class 10",
      section: "B",
      teacher: "Priya Verma",
      students: 38,
      room: "R-102",
      status: "Active",
    },
    {
      id: 3,
      className: "Class 11",
      section: "A",
      teacher: "Ankit Singh",
      students: 35,
      room: "R-201",
      status: "Inactive",
    },
    {
      id: 4,
      className: "Class 12",
      section: "A",
      teacher: "Sneha Gupta",
      students: 40,
      room: "R-301",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes Management"
        subtitle="Manage classes, sections and class teachers."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add Class
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Classes"
          value="42"
          icon={<School size={22} />}
        />

        <StatCard
          title="Active Classes"
          value="38"
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Rooms"
          value="25"
          icon={<DoorOpen size={22} />}
        />

        <StatCard
          title="Students"
          value="1250"
          icon={<Users size={22} />}
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
              placeholder="Search classes..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Grades</option>
              <option>Class 9</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Sections</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

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
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Section
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Students
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Room
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {classes.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.className}
                  </td>

                  <td className="px-6 py-4">
                    {item.section}
                  </td>

                  <td className="px-6 py-4">
                    {item.teacher}
                  </td>

                  <td className="px-6 py-4">
                    {item.students}
                  </td>

                  <td className="px-6 py-4">
                    {item.room}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                        <Eye size={18} />
                      </button>

                      <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                        <Pencil size={18} />
                      </button>

                      <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            Showing 1-4 of 42 classes
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

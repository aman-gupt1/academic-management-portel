import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserPlus,
  GraduationCap,
} from "lucide-react";

export default function Students() {
  const [search, setSearch] = useState("");

  const students = [
    {
      id: 1,
      name: "Aman Gupta",
      rollNo: "ST101",
      class: "10-A",
      email: "aman@gmail.com",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      rollNo: "ST102",
      class: "10-B",
      email: "ravi@gmail.com",
      phone: "9876543211",
      status: "Active",
    },
    {
      id: 3,
      name: "Neha Sharma",
      rollNo: "ST103",
      class: "11-A",
      email: "neha@gmail.com",
      phone: "9876543212",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Aryan Singh",
      rollNo: "ST104",
      class: "12-A",
      email: "aryan@gmail.com",
      phone: "9876543213",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Students Management"
        subtitle="Manage all student records and academic information."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add Student
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,250"
          icon={<Users size={22} />}
        />

        <StatCard
          title="Active Students"
          value="1,180"
          icon={<UserCheck size={22} />}
        />

        <StatCard
          title="New Admissions"
          value="45"
          icon={<UserPlus size={22} />}
        />

        <StatCard
          title="Graduated"
          value="25"
          icon={<GraduationCap size={22} />}
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
              placeholder="Search students..."
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
              <option>10-A</option>
              <option>10-B</option>
              <option>11-A</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Roll No
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Phone
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
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                        {student.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {student.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {student.rollNo}
                  </td>

                  <td className="px-6 py-4">
                    {student.class}
                  </td>

                  <td className="px-6 py-4">
                    {student.email}
                  </td>

                  <td className="px-6 py-4">
                    {student.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status}
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
            Showing 1-4 of 1250 students
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
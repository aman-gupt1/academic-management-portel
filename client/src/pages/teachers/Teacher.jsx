import React from 'react'

import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  GraduationCap,
  UserCheck,
  UserPlus,
  Building2,
} from "lucide-react";

export default function Teacher() {
  const [search, setSearch] = useState("");

  const teachers = [
    {
      id: 1,
      name: "Rahul Sharma",
      employeeId: "T101",
      department: "Science",
      subject: "Mathematics",
      email: "rahul@academexa.com",
      phone: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      employeeId: "T102",
      department: "Science",
      subject: "Physics",
      email: "priya@academexa.com",
      phone: "9876543211",
      status: "Active",
    },
    {
      id: 3,
      name: "Ankit Singh",
      employeeId: "T103",
      department: "Commerce",
      subject: "Accounts",
      email: "ankit@academexa.com",
      phone: "9876543212",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sneha Gupta",
      employeeId: "T104",
      department: "Arts",
      subject: "History",
      email: "sneha@academexa.com",
      phone: "9876543213",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers Management"
        subtitle="Manage all teachers and faculty members."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add Teacher
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Teachers"
          value="85"
          icon={<GraduationCap size={22} />}
        />

        <StatCard
          title="Active Teachers"
          value="80"
          icon={<UserCheck size={22} />}
        />

        <StatCard
          title="New Hires"
          value="5"
          icon={<UserPlus size={22} />}
        />

        <StatCard
          title="Departments"
          value="12"
          icon={<Building2 size={22} />}
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
              placeholder="Search teachers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Departments</option>
              <option>Science</option>
              <option>Commerce</option>
              <option>Arts</option>
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Employee ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Subject
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
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                        {teacher.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {teacher.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {teacher.employeeId}
                  </td>

                  <td className="px-6 py-4">
                    {teacher.department}
                  </td>

                  <td className="px-6 py-4">
                    {teacher.subject}
                  </td>

                  <td className="px-6 py-4">
                    {teacher.email}
                  </td>

                  <td className="px-6 py-4">
                    {teacher.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.status}
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
            Showing 1-4 of 85 teachers
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
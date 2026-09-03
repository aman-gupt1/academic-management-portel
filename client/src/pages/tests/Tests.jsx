import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  ClipboardCheck,
  CalendarDays,
  CheckCircle,
  BookOpen,
} from "lucide-react";

export default function Tests() {
  const [search, setSearch] = useState("");

  const tests = [
    {
      id: 1,
      name: "Mathematics Mid Term",
      subject: "Mathematics",
      class: "10-A",
      date: "15 Sep 2026",
      marks: 100,
      duration: "2 Hours",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Science Quiz",
      subject: "Science",
      class: "11-B",
      date: "18 Sep 2026",
      marks: 50,
      duration: "1 Hour",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "English Unit Test",
      subject: "English",
      class: "12-A",
      date: "02 Sep 2026",
      marks: 100,
      duration: "2 Hours",
      status: "Completed",
    },
    {
      id: 4,
      name: "Physics Assessment",
      subject: "Physics",
      class: "11-A",
      date: "25 Aug 2026",
      marks: 70,
      duration: "90 Minutes",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tests Management"
        subtitle="Create, schedule and manage academic tests."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700">
            <Plus size={18} />
            Create Test
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tests"
          value="35"
          icon={<ClipboardCheck size={22} />}
        />

        <StatCard
          title="Upcoming Tests"
          value="8"
          icon={<CalendarDays size={22} />}
        />

        <StatCard
          title="Completed Tests"
          value="27"
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Subjects Covered"
          value="12"
          icon={<BookOpen size={22} />}
        />
      </div>

      {/* Upcoming Tests */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Upcoming This Week
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="font-medium">
                Mathematics Mid Term
              </p>
              <p className="text-sm text-slate-500">
                Class 10-A
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              15 Sep
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="font-medium">
                Science Quiz
              </p>
              <p className="text-sm text-slate-500">
                Class 11-B
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              18 Sep
            </span>
          </div>
        </div>
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
              placeholder="Search tests..."
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

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Status</option>
              <option>Upcoming</option>
              <option>Completed</option>
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
                  Test Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Max Marks
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Duration
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
              {tests.map((test) => (
                <tr
                  key={test.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {test.name}
                  </td>

                  <td className="px-6 py-4">
                    {test.subject}
                  </td>

                  <td className="px-6 py-4">
                    {test.class}
                  </td>

                  <td className="px-6 py-4">
                    {test.date}
                  </td>

                  <td className="px-6 py-4">
                    {test.marks}
                  </td>

                  <td className="px-6 py-4">
                    {test.duration}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        test.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {test.status}
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
            Showing 1-4 of 35 tests
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

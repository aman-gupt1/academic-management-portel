import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Trophy,
  Users,
  TrendingUp,
  Award,
  Search,
  Download,
  Eye,
} from "lucide-react";

export default function Results() {
  const [search, setSearch] = useState("");

  const results = [
    {
      id: 1,
      student: "Aman Gupta",
      class: "10-A",
      exam: "Mathematics Mid Term",
      percentage: "95%",
      grade: "A+",
      status: "Pass",
    },
    {
      id: 2,
      student: "Priya Sharma",
      class: "10-A",
      exam: "Mathematics Mid Term",
      percentage: "93%",
      grade: "A",
      status: "Pass",
    },
    {
      id: 3,
      student: "Rahul Kumar",
      class: "11-B",
      exam: "Science Quiz",
      percentage: "45%",
      grade: "D",
      status: "Fail",
    },
    {
      id: 4,
      student: "Ankit Singh",
      class: "12-A",
      exam: "English Unit Test",
      percentage: "88%",
      grade: "A",
      status: "Pass",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results Management"
        subtitle="Track academic performance and examination results."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Download size={18} />
            Export Results
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Results"
          value="1,250"
          icon={<Users size={22} />}
        />

        <StatCard
          title="Pass Rate"
          value="92%"
          icon={<TrendingUp size={22} />}
        />

        <StatCard
          title="Top Performers"
          value="25"
          icon={<Trophy size={22} />}
        />

        <StatCard
          title="Average Score"
          value="78%"
          icon={<Award size={22} />}
        />
      </div>

      {/* Top Performers */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Top Performers
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">
            <div>
              <p className="font-medium">
                🥇 Aman Gupta
              </p>
              <p className="text-sm text-slate-500">
                Class 10-A
              </p>
            </div>

            <span className="font-semibold text-yellow-700">
              95%
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="font-medium">
                🥈 Priya Sharma
              </p>
              <p className="text-sm text-slate-500">
                Class 10-A
              </p>
            </div>

            <span className="font-semibold">
              93%
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="font-medium">
                🥉 Rahul Kumar
              </p>
              <p className="text-sm text-slate-500">
                Class 11-B
              </p>
            </div>

            <span className="font-semibold">
              91%
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
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Classes</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Exams</option>
              <option>Mid Term</option>
              <option>Final Exam</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Student
                </th>
                <th className="px-6 py-4 text-left">
                  Class
                </th>
                <th className="px-6 py-4 text-left">
                  Exam
                </th>
                <th className="px-6 py-4 text-left">
                  Percentage
                </th>
                <th className="px-6 py-4 text-left">
                  Grade
                </th>
                <th className="px-6 py-4 text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr
                  key={result.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {result.student}
                  </td>

                  <td className="px-6 py-4">
                    {result.class}
                  </td>

                  <td className="px-6 py-4">
                    {result.exam}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {result.percentage}
                  </td>

                  <td className="px-6 py-4">
                    {result.grade}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        result.status === "Pass"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
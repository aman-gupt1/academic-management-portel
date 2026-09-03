import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Users,
  Trophy,
  Activity,
} from "lucide-react";

export default function Activities() {
  const [search, setSearch] = useState("");

  const activities = [
    {
      id: 1,
      name: "Annual Sports Day",
      type: "Sports",
      date: "20 Sep 2026",
      venue: "School Ground",
      participants: 350,
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Science Exhibition",
      type: "Academic",
      date: "25 Sep 2026",
      venue: "Main Hall",
      participants: 120,
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Cultural Fest",
      type: "Cultural",
      date: "30 Sep 2026",
      venue: "Auditorium",
      participants: 280,
      status: "Upcoming",
    },
    {
      id: 4,
      name: "Debate Competition",
      type: "Academic",
      date: "12 Aug 2026",
      venue: "Conference Room",
      participants: 60,
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activities Management"
        subtitle="Manage school events, competitions and extracurricular activities."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Create Activity
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Activities"
          value="48"
          icon={<Activity size={22} />}
        />

        <StatCard
          title="Upcoming Events"
          value="12"
          icon={<CalendarDays size={22} />}
        />

        <StatCard
          title="Completed Events"
          value="36"
          icon={<Trophy size={22} />}
        />

        <StatCard
          title="Participants"
          value="2,450"
          icon={<Users size={22} />}
        />
      </div>

      {/* Upcoming Events */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Upcoming Events
        </h3>

        <div className="space-y-3">
          <EventItem
            title="Annual Sports Day"
            date="20 Sep 2026"
          />

          <EventItem
            title="Science Exhibition"
            date="25 Sep 2026"
          />

          <EventItem
            title="Cultural Fest"
            date="30 Sep 2026"
          />
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
              placeholder="Search activities..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Types</option>
              <option>Sports</option>
              <option>Academic</option>
              <option>Cultural</option>
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
                <th className="px-6 py-4 text-left">
                  Activity
                </th>

                <th className="px-6 py-4 text-left">
                  Type
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-left">
                  Venue
                </th>

                <th className="px-6 py-4 text-left">
                  Participants
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {activity.name}
                  </td>

                  <td className="px-6 py-4">
                    {activity.type}
                  </td>

                  <td className="px-6 py-4">
                    {activity.date}
                  </td>

                  <td className="px-6 py-4">
                    {activity.venue}
                  </td>

                  <td className="px-6 py-4">
                    {activity.participants}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        activity.status === "Upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {activity.status}
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

        <div className="flex items-center justify-between border-t border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            Showing 1-4 of 48 activities
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

function EventItem({ title, date }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
      <div>
        <p className="font-medium">{title}</p>
      </div>

      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
        {date}
      </span>
    </div>
  );
}

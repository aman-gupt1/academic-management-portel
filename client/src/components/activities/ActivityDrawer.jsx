import {
  X,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  FileText,
} from "lucide-react";

export default function ActivityDrawer({
  open,
  activity,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!activity) return null;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-screen
          w-full sm:w-[450px]
          bg-slate-50 shadow-2xl
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Activity Details
              </h2>

              <p className="text-sm text-indigo-100">
                View and manage activity information
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 transition-all hover:bg-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {/* Main Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.type}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    activity.status === "Upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </div>

            {/* Activity Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Trophy
                  size={18}
                  className="text-indigo-600"
                />
                <h3 className="font-semibold text-slate-800">
                  Activity Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={<CalendarDays size={16} />}
                  label="Date"
                  value={new Date(
                    activity.date
                  ).toLocaleDateString()}
                />

                <InfoItem
                  icon={<Users size={16} />}
                  label="Participants"
                  value={activity.participants}
                />

                <InfoItem
                  icon={<MapPin size={16} />}
                  label="Venue"
                  value={activity.venue}
                />

                <InfoItem
                  icon={<Trophy size={16} />}
                  label="Type"
                  value={activity.type}
                />
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileText
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Description
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-700">
                {activity.description ||
                  "No description available"}
              </p>
            </div>

            {/* Metadata */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-800">
                Record Information
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <InfoItem
                  label="Created At"
                  value={new Date(
                    activity.createdAt
                  ).toLocaleString()}
                />

                <InfoItem
                  label="Updated At"
                  value={new Date(
                    activity.updatedAt
                  ).toLocaleString()}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white p-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onEdit(activity)}
                className="rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
              >
                Edit Activity
              </button>

              <button
                onClick={() =>
                  onDelete(activity._id)
                }
                className="rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700"
              >
                Delete Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoItem({
  label,
  value,
  icon,
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-1 font-medium text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}
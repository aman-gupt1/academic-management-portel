import {
  X,
  BookOpen,
  Calendar,
  Clock,
  Award,
  User,
  FileText,
} from "lucide-react";

export default function TestDrawer({
  open,
  test,
  onEdit,
  onDelete,
  onClose,
}) {
  if (!test) return null;

  const status =
    new Date(test.testDate) > new Date()
      ? "Upcoming"
      : "Completed";

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
                Test Details
              </h2>

              <p className="text-sm text-indigo-100">
                View and manage test information
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 transition hover:bg-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">

            {/* Test Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">

                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {test.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {test.subject}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status === "Upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen size={15} />
                  <span>
                    {test.classId?.name} -
                    {test.classId?.section}
                  </span>
                </div>
              </div>
            </div>

            {/* Test Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center gap-2">
                <BookOpen
                  size={18}
                  className="text-indigo-600"
                />
                <h3 className="font-semibold text-slate-800">
                  Test Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <InfoItem
                  label="Subject"
                  value={test.subject}
                />

                <InfoItem
                  label="Total Marks"
                  value={test.totalMarks}
                />

                <InfoItem
                  label="Duration"
                  value={`${test.duration} Min`}
                />

                <InfoItem
                  label="Status"
                  value={status}
                />

              </div>
            </div>

            {/* Schedule */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center gap-2">
                <Calendar
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Schedule
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <InfoItem
                  label="Test Date"
                  value={new Date(
                    test.testDate
                  ).toLocaleDateString()}
                />

                <InfoItem
                  label="Created"
                  value={new Date(
                    test.createdAt
                  ).toLocaleDateString()}
                />

              </div>
            </div>

            {/* Teacher */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center gap-2">
                <User
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Assigned Teacher
                </h3>
              </div>

              <InfoItem
                label="Teacher Name"
                value={
                  test.teacherId?.userId?.name ||
                  "Not Assigned"
                }
              />
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

              <p className="text-sm text-slate-600">
                {test.description ||
                  "No description available"}
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white p-4">

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() => onEdit(test)}
                className="rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
              >
                Edit Test
              </button>

              <button
                onClick={() =>
                  onDelete(test._id)
                }
                className="rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700"
              >
                Delete Test
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
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  );
}
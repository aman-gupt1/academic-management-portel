import {
  X,
  User,
  GraduationCap,
  CalendarDays,
  CheckCircle,
  Clock3,
} from "lucide-react";


export default function AttendanceDrawer({
  open,
  attendance,
  onClose,
}) {
  if (!attendance) return null;

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
                Attendance Details
              </h2>

              <p className="text-sm text-indigo-100">
                View attendance information
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 hover:bg-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">

            {/* Student Info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <User
                  size={18}
                  className="text-indigo-600"
                />
                <h3 className="font-semibold">
                  Student Information
                </h3>
              </div>

              <InfoItem
                label="Student Name"
                value={
                  attendance.studentId?.userId?.name
                }
              />

              <InfoItem
                label="Student Email"
                value={
                  attendance.studentId?.userId?.email
                }
              />
            </div>

            {/* Attendance Info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap
                  size={18}
                  className="text-indigo-600"
                />
                <h3 className="font-semibold">
                  Attendance Information
                </h3>
              </div>

              <InfoItem
                label="Class"
                value={
                  attendance.classId?.name
                }
              />

              <InfoItem
                label="Section"
                value={
                  attendance.classId?.section
                }
              />

              <InfoItem
                label="Date"
                value={new Date(
                  attendance.date
                ).toLocaleDateString()}
              />

              <InfoItem
                label="Status"
                value={attendance.status}
              />
            </div>

            {/* Marked By */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle
                  size={18}
                  className="text-indigo-600"
                />
                <h3 className="font-semibold">
                  Marked By
                </h3>
              </div>

              <InfoItem
                label="Teacher Name"
                value={
                  attendance.markedBy?.userId?.name
                }
              />

              <InfoItem
                label="Teacher Email"
                value={
                  attendance.markedBy?.userId?.email
                }
              />
            </div>

            {/* System Info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Clock3
                  size={18}
                  className="text-indigo-600"
                />
                <h3 className="font-semibold">
                  System Information
                </h3>
              </div>

              <InfoItem
                label="Attendance ID"
                value={attendance._id}
              />

              <InfoItem
                label="Created At"
                value={new Date(
                  attendance.createdAt
                ).toLocaleString()}
              />

              <InfoItem
                label="Updated At"
                value={new Date(
                  attendance.updatedAt
                ).toLocaleString()}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="font-medium text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}
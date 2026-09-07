import {
  X,
  School,
  User,
  CalendarDays,
  Mail,
} from "lucide-react";

export default function ClassDrawer({
  open,
  classData,
  onEdit,
  onDelete,
  onClose,
}) {
  if (!classData) return null;

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
                Class Details
              </h2>

              <p className="text-sm text-indigo-100">
                View and manage class information
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

            {/* Profile Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">

                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <School size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {classData.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Section • {classData.section}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    classData.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {classData.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

              </div>
            </div>

            {/* Academic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Academic Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <InfoItem
                  label="Academic Year"
                  value={classData.academicYear}
                />

                <InfoItem
                  label="Created Date"
                  value={new Date(
                    classData.createdAt
                  ).toLocaleDateString()}
                />

                <InfoItem
                  label="Students"
                  value="-"
                />

                <InfoItem
                  label="Room"
                  value="-"
                />

              </div>
            </div>

            {/* Class Teacher */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <User
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Class Teacher
                </h3>
              </div>

              <div className="space-y-4">

                <InfoItem
                  label="Teacher Name"
                  value={
                    classData.classTeacherId?.userId?.name
                  }
                />

                <InfoItem
                  label="Employee ID"
                  value={
                    classData.classTeacherId?.employeeId
                  }
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Email
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-slate-700">
                    <Mail size={15} />

                    <span>
                      {
                        classData.classTeacherId?.userId
                          ?.email
                      }
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t bg-white p-4">
            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() => onEdit(classData)}
                className="rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
              >
                Edit Class
              </button>

              <button
                onClick={() =>
                  onDelete(classData._id)
                }
                className="rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700"
              >
                Delete Class
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function InfoItem({ label, value }) {
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
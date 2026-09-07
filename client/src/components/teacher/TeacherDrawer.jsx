import {
  X,
  Mail,
  Phone,
  GraduationCap,
  User,
  CalendarDays,
} from "lucide-react";

export default function TeacherDrawer({
  open,
  teacher,
  onDelete,
  onEdit,
  onClose,
}) {
  if (!teacher) return null;

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
                Teacher Profile
              </h2>

              <p className="text-sm text-indigo-100">
                View and manage teacher information
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

            {/* Profile Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                    {teacher.userId?.name?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {teacher.userId?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Teacher • {teacher.employeeId}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    teacher.userId?.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {teacher.userId?.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="space-y-3 text-sm">
                  
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={15} />
                    <span>
                      {teacher.userId?.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={15} />
                    <span>
                      {teacher.userId?.phone ||
                        "N/A"}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <User
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Professional Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Employee ID"
                  value={teacher.employeeId}
                />

                <InfoItem
                  label="Qualification"
                  value={teacher.qualification}
                />

                <InfoItem
                  label="Role"
                  value="Teacher"
                />

                <InfoItem
                  label="Join Date"
                  value={new Date(
                    teacher.joinDate
                  ).toLocaleDateString()}
                />
              </div>
            </div>

            {/* Teaching Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Teaching Information
                </h3>
              </div>

              <div>
                <p className="mb-3 text-xs text-slate-500">
                  Subjects
                </p>

                <div className="flex flex-wrap gap-2">
                  {teacher.subjects?.map(
                    (subject, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                      >
                        {subject}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t bg-white p-4">
            <div className="grid grid-cols-2 gap-3">
              
              <button
                onClick={() => onEdit(teacher)}
                className="rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Edit Teacher
              </button>

              <button
                onClick={() =>
                  onDelete(teacher._id)
                }
                className="rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Delete Teacher
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
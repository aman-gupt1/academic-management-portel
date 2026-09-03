import {
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  User,
} from "lucide-react";

export default function StudentDrawer({
  open,
  student,
  onDelete,
  onEdit,
  onClose,
}) {
  if (!student) return null;

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
                Student Profile
              </h2>

              <p className="text-sm text-indigo-100">
                View and manage student information
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-2xl bg-white/20 text-white transition-all duration-200 hover:bg-red-500 hover:scale-105"
                >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4 p-5">
            {/* Profile + Contact */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                    {student.userId?.name?.charAt(0)}
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {student.userId?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Student •{" "}
                      {student.admissionNumber} •{" "}
                      {student.classId?.name}-
                      {student.classId?.section}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    student.userId?.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {student.userId?.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              {/* Contact */}
            <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700">
                
                <div className="flex items-center gap-2">
                <Mail
                    size={15}
                    className="text-slate-500"
                />
                <span>{student.userId?.email}</span>
                </div>

                <div className="flex items-center gap-2">
                <Phone
                    size={15}
                    className="text-slate-500"
                />
                <span>
                    {student.userId?.phone || "N/A"}
                </span>
                </div>

                <div className="flex items-center gap-2">
                <MapPin
                    size={15}
                    className="text-slate-500"
                />
                <span>{student.address}</span>
                </div>

            </div>
            </div>
            </div>

            {/* Academic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Academic Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Admission No"
                  value={
                    student.admissionNumber
                  }
                />

                <InfoItem
                  label="Roll No"
                  value={student.rollNumber}
                />

                <InfoItem
                  label="Class"
                  value={`${student.classId?.name}-${student.classId?.section}`}
                />

                <InfoItem
                  label="Academic Year"
                  value={
                    student.classId
                      ?.academicYear
                  }
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <User
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <InfoItem
                  label="Gender"
                  value={student.gender}
                />

                <InfoItem
                  label="Parent Name"
                  value={
                    student.parentName
                  }
                />

                <InfoItem
                  label="Date of Birth"
                  value={new Date(
                    student.dateOfBirth
                  ).toLocaleDateString()}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white p-4">
            <div className="grid grid-cols-2 gap-3">
              <button 
              onClick={() => onEdit(student)}
              className="rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 cursor-pointer">
                Edit Student
              </button>

              <button 
              onClick={() => onDelete(student._id)}
              className="rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700 cursor-pointer">
                Delete Student
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
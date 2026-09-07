import {
  X,
  Trophy,
  FileText,
  GraduationCap,
  User,
} from "lucide-react";

export default function ResultDrawer({
  open,
  result,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!result) return null;

  const percentage = result?.testId?.totalMarks
    ? (
        (result.marksObtained /
          result.testId.totalMarks) *
        100
      ).toFixed(1)
    : 0;

  const status =
    Number(percentage) >= 40
      ? "Pass"
      : "Fail";

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
          w-full sm:w-[500px]
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
                Result Details
              </h2>

              <p className="text-sm text-indigo-100">
                View student result information
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

            {/* Student Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                    {result.studentId?.userId?.name?.charAt(
                      0
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {
                        result.studentId?.userId
                          ?.name
                      }
                    </h3>

                    <p className="text-sm text-slate-500">
                      Admission No :{" "}
                      {
                        result.studentId
                          ?.admissionNumber
                      }
                    </p>

                    <p className="text-sm text-slate-500">
                      Roll No :{" "}
                      {
                        result.studentId
                          ?.rollNumber
                      }
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status === "Pass"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>

            {/* Test Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FileText
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Test Information
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Test Name"
                  value={result.testId?.title}
                />

                <InfoItem
                  label="Subject"
                  value={result.testId?.subject}
                />

                <InfoItem
                  label="Total Marks"
                  value={
                    result.testId?.totalMarks
                  }
                />

                <InfoItem
                  label="Duration"
                  value={`${result.testId?.duration} Min`}
                />

                <InfoItem
                  label="Test Date"
                  value={new Date(
                    result.testId?.testDate
                  ).toLocaleDateString()}
                />

                <InfoItem
                  label="Class"
                  value={`${result.testId?.classId?.name} - ${result.testId?.classId?.section}`}
                />
              </div>
            </div>

            {/* Performance */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Trophy
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Performance
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  label="Marks Obtained"
                  value={
                    result.marksObtained
                  }
                />

                <InfoItem
                  label="Percentage"
                  value={`${percentage}%`}
                />

                <InfoItem
                  label="Grade"
                  value={result.grade}
                />

                <InfoItem
                  label="Status"
                  value={status}
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <GraduationCap
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Remarks
                </h3>
              </div>

              <p className="text-sm text-slate-600">
                {result.remarks ||
                  "No remarks available"}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white p-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onEdit(result)}
                className="rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Edit Result
              </button>

              <button
                onClick={() =>
                  onDelete(result._id)
                }
                className="rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
              >
                Delete Result
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
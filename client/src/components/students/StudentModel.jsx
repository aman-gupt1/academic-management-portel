import { X } from "lucide-react";
import StudentForm from "./StudentForm";

export default function StudentModal({
  open,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  classes,
}) {
  if (!open) return null;

  

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Edit Student
              </h2>

              <p className="text-xs text-indigo-100">
                Update student information
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-indigo-600 transition hover:bg-red-500 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <div className="p-4 md:p-5">
            <StudentForm
              formData={formData}
              handleChange={handleChange}
              classes={classes}
            />
          </div>

          {/* Footer */}
          <div className="border-t bg-slate-50 p-3 md:p-4">
            {/* <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"> */}
               <div className="flex gap-2">
            <button
                onClick={onClose}
                className="w-1/2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
                Cancel
            </button>

            <button
                onClick={handleSubmit}
                className="w-1/2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
                Save Changes
            </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
import { X } from "lucide-react";
import TeacherForm from "./TeacherForm";

export default function TeacherEditModal({open,onClose,formData,handleChange,handleSubmit,}) {

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
        <div
          className=" w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Edit Teacher
              </h2>

              <p className="text-xs text-indigo-100">
                Update teacher information
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
          <div className="max-h-[70vh] overflow-y-auto p-4 md:p-5">
            <TeacherForm
              formData={formData}
              handleChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="border-t bg-slate-50 p-3 md:p-4">
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
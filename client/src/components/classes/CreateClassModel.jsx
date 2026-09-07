import { X } from "lucide-react";
import { useState } from "react";

export default function CreateClassModal({
  open,
  onClose,
  teachers,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    academicYear: "",
    classTeacherId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate(formData);

    setFormData({
      name: "",
      section: "",
      academicYear: "",
      classTeacherId: "",
    });
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Create Class
              </h2>

              <p className="text-sm text-indigo-100">
                Add a new class to the system
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 hover:bg-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">

              {/* Class Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Class Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="B. TECH"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Section */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Section
                </label>

                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="A"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Academic Year */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Academic Year
                </label>

                <input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  placeholder="2026-2027"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Class Teacher */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Class Teacher
                </label>

                <select
                  name="classTeacherId"
                  value={formData.classTeacherId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select Class Teacher
                  </option>

                  {teachers.map((teacher) => (
                    <option
                      key={teacher._id}
                      value={teacher._id}
                    >
                      {teacher.userId?.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
              >
                Create Class
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CreateTestModal({
  open,
  onClose,
  classes = [],
  teachers = [],
  onSubmit,
  editData,
}) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    classId: "",
    teacherId: "",
    testDate: "",
    totalMarks: "",
    duration: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      totalMarks: Number(formData.totalMarks),
      duration: Number(formData.duration),
    });

    setFormData({
      title: "",
      subject: "",
      classId: "",
      teacherId: "",
      testDate: "",
      totalMarks: "",
      duration: "",
      description: "",
    });

    onClose();
  };

  useEffect(() => {

  if (editData) {

    setFormData({
      title: editData.title || "",
      subject: editData.subject || "",
      classId: editData.classId?._id || "",
      teacherId: editData.teacherId?._id || "",
      testDate:
        editData.testDate?.split("T")[0] || "",
      totalMarks:
        editData.totalMarks || "",
      duration:
        editData.duration || "",
      description:
        editData.description || "",
    });

  }

}, [editData]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        <div
          className="
            w-full
            max-w-3xl
            rounded-3xl
            bg-white
            shadow-2xl
            max-h-[95vh]
            overflow-hidden
            flex
            flex-col
          "
        >
          {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-3 text-white">
        <div>
            <h2 className="text-lg font-semibold">
            {editData ? "Edit Test" : "Create Test"}
            </h2>

            <p className="text-xs text-indigo-100">
            Schedule and manage academic tests
            </p>
        </div>

        <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 transition hover:bg-red-500"
        >
            <X size={18} />
        </button>
        </div>

          {/* Form */}
          <form
            id="create-test-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-5"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Test Title */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Test Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Mathematics Mid Term"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mathematics"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Class */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Class
                </label>

                <select
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select Class
                  </option>

                  {classes.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                    >
                      {item.name} - {item.section}
                    </option>
                  ))}
                </select>
              </div>

              {/* Teacher */}
            <div>
            <label className="mb-1 block text-sm font-medium">
                Teacher
            </label>

            <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            >
                <option value="">
                Select Teacher
                </option>

               {teachers.map((teacher) => (
                <option
                    key={teacher._id}
                    value={teacher._id}
                >
                    {teacher.userId?.name} ({teacher.employeeId})
                </option>
                ))} 
            </select>
            </div>

              {/* Test Date */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Test Date
                </label>

                <input
                  type="date"
                  name="testDate"
                  value={formData.testDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Total Marks */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Total Marks
                </label>

                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  placeholder="100"
                  required
                  min="1"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Duration (Minutes)
                </label>

                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="120"
                  required
                  min="1"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional test description..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

            </div>
          </form>

          {/* Footer */}
            <div className="sticky bottom-0 border-t border-slate-200 bg-slate-50 px-5 py-3">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                Cancel
                </button>

                <button
                type="submit"
                form="create-test-form"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
                >
                {editData ? "Update Test" : "Create Test"}
                </button>

            </div>
            </div>

        </div>
      </div>
    </>
  );
}
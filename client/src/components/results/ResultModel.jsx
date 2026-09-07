import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ResultModal({
  open,
  onClose,
  onSubmit,
  tests = [],
  students = [],
  editData = null,
}) {
  const [formData, setFormData] = useState({
    testId: "",
    studentId: "",
    marksObtained: "",
    grade: "",
    remarks: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        testId: editData.testId?._id || "",
        studentId: editData.studentId?._id || "",
        marksObtained: editData.marksObtained || "",
        grade: editData.grade || "",
        remarks: editData.remarks || "",
      });
    } else {
      setFormData({
        testId: "",
        studentId: "",
        marksObtained: "",
        grade: "",
        remarks: "",
      });
    }
  }, [editData]);

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
      marksObtained: Number(formData.marksObtained),
    });

    onClose();
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-3">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {editData ? "Edit Result" : "Create Result"}
              </h2>

              <p className="text-xs text-slate-500">
                Manage student examination result
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-red-100 hover:text-red-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            id="result-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-5"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Test */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Test
                </label>

                <select
                  name="testId"
                  value={formData.testId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select Test
                  </option>

                  {tests.map((test) => (
                    <option
                      key={test._id}
                      value={test._id}
                    >
                      {test.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Student
                </label>

                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (
                    <option
                      key={student._id}
                      value={student._id}
                    >
                      {student.userId?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marks */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Marks Obtained
                </label>

                <input
                  type="number"
                  name="marksObtained"
                  value={formData.marksObtained}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Grade */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Grade
                </label>

                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="A+"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Remarks */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Remarks
                </label>

                <textarea
                  rows={4}
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Excellent performance..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

            </div>
          </form>

          {/* Footer */}
          <div className="border-t bg-slate-50 px-5 py-3">
            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="result-form"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700"
              >
                {editData ? "Update Result" : "Create Result"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
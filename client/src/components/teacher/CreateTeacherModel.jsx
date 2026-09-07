import { X } from "lucide-react";
import { useState, useEffect} from "react";

export default function CreateTeacherModal({open, onClose,teacherUsers, onCreate,}) {
  const [formData, setFormData] = useState({
    userId: "",
    employeeId: "",
    qualification: "",
    subjects: "",
    joinDate: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async(e) => {
  e.preventDefault();
 await onCreate(formData);

  setFormData({
    userId: "",
    employeeId: "",
    qualification: "",
    subjects: "",
    joinDate: "",
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
        <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Create Teacher
              </h2>

              <p className="text-sm text-indigo-100">
                Add a new teacher to the system
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
          <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">

              {/* Teacher User */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Teacher User
                </label>

                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                >
                <option value="">
                Select Teacher User
                </option>

                {teacherUsers.map((user) => (
                <option
                    key={user._id}
                    value={user._id}
                >
                    {user.name} ({user.email})
                </option>
                ))}
                </select>
              </div>

              {/* Employee ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Employee ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="WM-101"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Qualification
                </label>

                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="M.Tech Computer Science"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Join Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Join Date
                </label>

                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Subjects */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subjects
                </label>

                <input
                  type="text"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleChange}
                  placeholder="JavaScript, React, Node.js"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />

                <p className="mt-1 text-xs text-slate-500">
                  Separate multiple subjects with commas
                </p>
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
                Create Teacher
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
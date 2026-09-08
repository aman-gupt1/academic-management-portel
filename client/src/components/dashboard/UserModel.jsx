import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function UserModal({
  open,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "student",
      phone: "",
    });
    const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Register User
              </h2>

              <p className="text-sm text-indigo-100">
                Create new system user
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 hover:bg-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            id="user-form"
            onSubmit={handleSubmit}
            className="max-h-[65vh] overflow-y-auto p-5"
          >
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

             <div>
  <label className="mb-2 block text-sm font-medium">
    Password
  </label>

  <div className="relative">
    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
      name="password"
      required
      value={formData.password}
      onChange={handleChange}
      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-indigo-500"
    />

                <button
                type="button"
                onClick={() =>
                    setShowPassword(
                    !showPassword
                    )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
                >
                {showPassword ? (
                    <EyeOff size={20} />
                ) : (
                    <Eye size={20} />
                )}
                </button>
            </div>
            </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="student">
                    Student
                  </option>

                  <option value="teacher">
                    Teacher
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

            </div>
          </form>

          {/* Footer */}
          <div className="border-t bg-slate-50 p-5">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="user-form"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
              >
                Register User
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
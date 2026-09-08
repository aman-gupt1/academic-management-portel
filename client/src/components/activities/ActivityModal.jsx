import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ActivityModal({
  open,
  onClose,
  onSubmit,
  editData = null,
}) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: "",
    venue: "",
    participants: "",
    description: "",
    status: "Upcoming",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        type: editData.type || "",
        date: editData.date
          ? editData.date.split("T")[0]
          : "",
        venue: editData.venue || "",
        participants:
          editData.participants || "",
        description:
          editData.description || "",
        status:
          editData.status || "Upcoming",
      });
    } else {
      setFormData({
        title: "",
        type: "",
        date: "",
        venue: "",
        participants: "",
        description: "",
        status: "Upcoming",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      participants: Number(
        formData.participants
      ),
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                {editData
                  ? "Edit Activity"
                  : "Create Activity"}
              </h2>

              <p className="text-sm text-indigo-100">
                Manage school activities
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
          <form
            id="activity-form"
            onSubmit={handleSubmit}
            className="max-h-[65vh] overflow-y-auto p-5"
          >
            <div className="grid gap-5 md:grid-cols-2">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Activity Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Activity Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">
                    Select Type
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Competition">
                    Competition
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Venue */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Participants */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Participants
                </label>

                <input
                  type="number"
                  name="participants"
                  value={
                    formData.participants
                  }
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="Upcoming">
                    Upcoming
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={
                    formData.description
                  }
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
                form="activity-form"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
              >
                {editData
                  ? "Update Activity"
                  : "Create Activity"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
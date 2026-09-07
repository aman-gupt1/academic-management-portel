export default function TeacherForm({
  formData,
  handleChange,
}) {
  return (
    <div className="space-y-3 md:space-y-4">
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <Input
          label="Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <Input
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />

        <Input
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId || ""}
          onChange={handleChange}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <Input
          label="Qualification"
          name="qualification"
          value={formData.qualification || ""}
          onChange={handleChange}
        />

        <Input
          type="date"
          label="Join Date"
          name="joinDate"
          value={formData.joinDate || ""}
          onChange={handleChange}
        />
      </div>

      {/* Subjects */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Subjects
        </label>

        <input
          type="text"
          name="subjects"
          value={formData.subjects || ""}
          onChange={handleChange}
          placeholder="JavaScript, React, Node.js"
          className="h-10 md:h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

function Input({
  label,
  disabled = false,
  ...props
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        disabled={disabled}
        {...props}
        className="
          h-10
          md:h-11
          w-full
          rounded-xl
          border
          border-slate-300
          px-3
          outline-none
          focus:border-indigo-500
          disabled:bg-slate-100
        "
      />
    </div>
  );
}
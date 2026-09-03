export default function StudentForm({
  formData,
  handleChange,
  classes = [],
}) {
  return (
    <div className="space-y-3 md:space-y-4">

      {/* Row 1 */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
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
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <Input
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />

        <Input
          label="Parent Name"
          name="parentName"
          value={formData.parentName || ""}
          onChange={handleChange}
        />
      </div>

      {/* Row 3 */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Class
          </label>

          <select
            name="classId"
            value={formData.classId || ""}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
          >
            <option value="">
              Select Class
            </option>

            {classes.map((cls) => (
              <option
                key={cls._id}
                value={cls._id}
              >
                {cls.name}-{cls.section}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber || ""}
          onChange={handleChange}
        />
      </div>

      {/* Row 4 */}
     <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <Input
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth || ""}
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Address
        </label>

        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
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
      <label className="mb-0.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        disabled={disabled}
        {...props}
        className="h-10 md:h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500 disabled:bg-slate-100"
      />
    </div>
  );
}
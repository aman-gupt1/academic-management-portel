export default function CreateStudentForm({
  formData,
  handleChange,
  classes = [],
  users = [],
}) {
  return (
    <div className="space-y-3 md:space-y-4">

      {/* Student User */}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Student User
        </label>

        <select
          name="userId"
          value={formData.userId || ""}
          onChange={handleChange}
          className="h-10 md:h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
        >
          <option value="">
            Select Student
          </option>

          {users.map((user) => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Row 1 */}
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          label="Admission Number"
          name="admissionNumber"
          value={formData.admissionNumber || ""}
          onChange={handleChange}
        />

        <Input
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber || ""}
          onChange={handleChange}
        />
      </div>

      {/* Row 2 */}
      <div className="grid gap-3 md:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Class
          </label>

          <select
            name="classId"
            value={formData.classId || ""}
            onChange={handleChange}
            className="h-10 md:h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
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

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="h-10 md:h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

      </div>

      {/* Row 3 */}
      <div className="grid gap-3 md:grid-cols-2">

        <Input
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth || ""}
          onChange={handleChange}
        />

        <Input
          label="Parent Name"
          name="parentName"
          value={formData.parentName || ""}
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

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className="h-10 md:h-11 w-full rounded-xl border border-slate-300 px-3 outline-none focus:border-indigo-500"
      />
    </div>
  );
}
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function UserDistribution({totalStudents,totalTeachers, totalAdmins,}) {
  const data = [
    {
      name: "Admins",
      value: totalAdmins,
      color: "#4f46e5",
    },
    {
      name: "Teachers",
      value: totalTeachers,
      color: "#06b6d4",
    },
    {
      name: "Students",
      value: totalStudents,
      color: "#10b981",
    },
  ];

  const totalUsers = data.reduce(
    (acc, item) => acc + item.value,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-800">
        User Distribution
      </h2>

      <div className="flex flex-col items-center gap-6 lg:flex-row">

        {/* Donut Chart */}
        <div className="relative h-[250px] w-full lg:w-1/2">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {data.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.color}
                    />
                  )
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold text-slate-800">
              {totalUsers}
            </h3>

            <p className="text-sm text-slate-500">
              Total Users
            </p>
          </div>

        </div>

        {/* Statistics */}
        <div className="w-full space-y-5 lg:w-1/2">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3">

                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      item.color,
                  }}
                />

                <span className="font-medium text-slate-700">
                  {item.name}
                </span>

              </div>

              <span className="text-lg font-bold text-slate-800">
                {item.value}
              </span>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
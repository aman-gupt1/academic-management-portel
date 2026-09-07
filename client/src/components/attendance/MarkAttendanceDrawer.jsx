import { X, Users } from "lucide-react";
import { useState } from "react";
import * as studentApi from "../../api/studentApi.js";
import * as attendanceApi from "../../api/attendanceApi.js"

export default function MarkAttendanceDrawer({open, classes, onClose,}) {

const [selectedClass, setSelectedClass] = useState("");
const [attendanceDate, setAttendanceDate] = useState("");

const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(false);


const [attendanceData, setAttendanceData] = useState({});

// handle load student function
const handleLoadStudents = async () => {
  console.log("Class:", selectedClass);
  console.log("Date:", attendanceDate);

  try {
    const response = await studentApi.getStudents({
      classId: selectedClass,
    });

    console.log("FULL RESPONSE:", response);
    console.log("DATA:", response.data);

    setStudents(response.data.data);

  } catch (error) {
    console.log("ERROR:", error);
    console.log(error.response?.data);
  }
};

// status chnage function
const handleStatusChange = (
  studentId,
  status
) => {
  setAttendanceData((prev) => ({
    ...prev,
    [studentId]: status,
  }));
};

// handle mark all status
const handleMarkAll = (status) => {
  const updatedAttendance = {};

  students.forEach((student) => {
    updatedAttendance[student._id] = status;
  });

  setAttendanceData(updatedAttendance);
};

// mark attendace all
const handleSaveAttendance = async () => {
  try {

    if (!selectedClass) {
      return alert("Please select class");
    }

    if (!attendanceDate) {
      return alert("Please select date");
    }

    const attendancePayload = students
      .filter(
        (student) =>
          attendanceData[student._id]
      )
      .map((student) => ({
        studentId: student._id,
        classId: selectedClass,
        date: attendanceDate,
        status:
          attendanceData[student._id],

        // login teacher id
        markedBy:
          "YOUR_TEACHER_ID",
      }));

    if (attendancePayload.length === 0) {
      return alert(
        "Please mark attendance"
      );
    }

    console.log(attendancePayload);

    await attendanceApi.createAttendance(
      attendancePayload
    );

    alert(
      "Attendance saved successfully"
    );

    onClose();

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to save attendance"
    );
  }
};

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-screen
          w-full sm:w-[550px]
          bg-slate-50 shadow-2xl
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col">

          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 px-5 py-4 text-white">
            <div>
              <h2 className="text-lg font-semibold">
                Mark Attendance
              </h2>

              <p className="text-sm text-indigo-100">
                Mark attendance for students
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 hover:bg-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">

            {/* Class & Date */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-800">
                Attendance Details
              </h3>

              <div className="space-y-4">

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Class
                  </label>

                <select
                    value={selectedClass}
                    onChange={(e) =>
                        setSelectedClass(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                    >
                    <option value="">
                        Select Class
                    </option>

                    {classes?.map((item) => (
                        <option
                        key={item._id}
                        value={item._id}
                        >
                        {item.name} - {item.section}
                        </option>
                    ))}
                    </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) =>
                        setAttendanceDate(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                onClick={handleLoadStudents}
                  className="cursor-pointer w-full rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
                >
                  Load Students
                </button>

              </div>
            </div>

            {/* Students List Placeholder */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center gap-2">
                <Users
                  size={18}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold text-slate-800">
                  Students
                </h3>
                    <div className="mb-4 flex gap-2">
                    <button
                        onClick={() =>
                        handleMarkAll("present")
                        }
                        className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                    >
                        Mark All Present
                    </button>

                    <button
                        onClick={() =>
                        handleMarkAll("absent")
                        }
                        className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                        Mark All Absent
                    </button>

                    <button
                        onClick={() =>
                        handleMarkAll("late")
                        }
                        className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
                    >
                        Mark All Late
                    </button>
                    </div>
              </div>

              {students.length === 0 ? (
                <div className="py-10 text-center text-slate-500">
                    Select class and click
                    <br />
                    "Load Students"
                </div>
                ) : (
                <div className="space-y-3">
                    {students.map((student) => (
                    <div
                        key={student._id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
                    >
                        <div>
                        <p className="font-medium text-slate-800">
                            {student.userId?.name}
                        </p>

                        <p className="text-sm text-slate-500">
                            Roll No: {student.rollNumber}
                        </p>
                        </div>

                        <div className="flex gap-2">
                        <button
                            onClick={() =>
                            handleStatusChange(
                                student._id,
                                "present"
                            )
                            }
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                            attendanceData[student._id] ===
                            "present"
                                ? "bg-green-600 text-white"
                                : "bg-green-100 text-green-700"
                            }`}
                        >
                            Present
                        </button>

                        <button
                            onClick={() =>
                            handleStatusChange(
                                student._id,
                                "absent"
                            )
                            }
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                            attendanceData[student._id] ===
                            "absent"
                                ? "bg-red-600 text-white"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                            Absent
                        </button>

                        <button
                            onClick={() =>
                            handleStatusChange(
                                student._id,
                                "late"
                            )
                            }
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                            attendanceData[student._id] ===
                            "late"
                                ? "bg-yellow-500 text-white"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            Late
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                )}

            </div>

          </div>

          {/* Footer */}
          <div className="border-t bg-white p-4">

            <button
            onClick={handleSaveAttendance}
              className="w-full rounded-xl bg-green-600 py-3 font-medium text-white hover:bg-green-700"
            >
              Save Attendance
            </button>

          </div>

        </div>
      </div>
    </>
  );
}
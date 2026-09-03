import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import * as studentApi from '../../api/studentApi.js'
import StudentDrawer from "../../components/students/StudentDrawer";
import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserPlus,
  GraduationCap,
} from "lucide-react";
import StudentModal from "../../components/students/StudentModel.jsx";
import CreateStudentModal from "../../components/students/CreateStudentModel.jsx";
import * as classApi from "../../api/classApi.js";
import * as userApi from "../../api/userApi.js";

export default function Students() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const navigate=useNavigate()

  const [users, setUsers] = useState([]);

  const [drawerOpen, setDrawerOpen]=useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editOpen, setEditOpen]=useState(false);

  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  parentName: "",
  rollNumber: "",
  classId: "",
  gender: "",
  dateOfBirth: "",
  address: "",
});

const [createOpen, setCreateOpen] = useState(false);

const [createForm, setCreateForm] = useState({
  userId: "",
  admissionNumber: "",
  rollNumber: "",
  classId: "",
  dateOfBirth: "",
  gender: "Male",
  parentName: "",
  address: "",
});

const [stats, setStats] = useState({
  totalStudents: 0,
  activeStudents: 0,
  newAdmissions: 0,
  graduatedStudents: 0,
});



  // fetch student 
  const fetchStudents = async () => {
  try {
    const { data } = await studentApi.getStudents();

    console.log(data);

    setStudents(data.data);
  } catch (error) {
    console.log(error);
  }
};

// create student 
const handleCreateChange = (e) => {
  setCreateForm({
    ...createForm,
    [e.target.name]: e.target.value,
  });
};

const handleCreateStudent = async () => {
  try {
    await studentApi.createStudent(createForm);

    setCreateOpen(false);

    fetchStudents();

    setCreateForm({
      userId: "",
      admissionNumber: "",
      rollNumber: "",
      classId: "",
      dateOfBirth: "",
      gender: "",
      parentName: "",
      address: "",
    });
  } catch (error) {
    console.log(error);
  }
};

//========= delete student
  const handleDeleteStudent = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmed) return;

  try {
    await studentApi.deleteStudent(id);

    alert("Student deleted successfully");

    fetchStudents();
    setDrawerOpen(false);
  } catch (error) {
    console.log(error);
    alert("Failed to delete student");
  }
};

// get student details
const handleViewStudent = (student) => {
  setSelectedStudent(student);
  setDrawerOpen(true);
};


// edit student
const handleEditStudent = (
  student
) => {
  setFormData({
    id: student._id,

    name: student.userId?.name || "",
    email: student.userId?.email || "",
    phone: student.userId?.phone || "",

    admissionNumber:
      student.admissionNumber || "",

    rollNumber:
      student.rollNumber || "",

    classId:
      student.classId?._id || "",

    gender: student.gender || "",

    dateOfBirth:
      student.dateOfBirth
        ?.split("T")[0] || "",

    parentName:
      student.parentName || "",

    address: student.address || "",
  });

  setEditOpen(true);
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]:
      e.target.value,
  });
};

// handle update student
const handleUpdateStudent = async () => {
  try {
    await studentApi.updateStudent(
      formData.id,
      formData
    );

    alert("Student updated successfully");

    setEditOpen(false);

    fetchStudents();

    if (drawerOpen) {
      setDrawerOpen(false);
    }
  } catch (error) {
    console.log(error);
    alert("Failed to update student");
  }
};


// fetch classes
const fetchClasses = async () => {
  const { data } =
    await classApi.getClasses();

  setClasses(data.data);
};

// fetch users
const fetchUsers = async () => {
  try {
    const { data } = await userApi.getStudentUsers();
    console.log("Users Response:", data);
    setUsers(data.data);
  } catch (error) {
    console.log(error);
  }
};


// fetch students stats
const fetchStudentStats = async () => {
  try {
    const { data } = await studentApi.getStudentStats();

    setStats(data.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchStudents();
  fetchClasses();
  fetchClasses();
  fetchUsers();
  fetchStudentStats();
}, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Students Management"
        subtitle="Manage all student records and academic information."
        action={
          <button 
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add Student
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          icon={<UserCheck size={22} />}
        />

        <StatCard
          title="New Admissions"
          value={stats.newAdmissions}
          icon={<UserPlus size={22} />}
        />

        <StatCard
          title="Graduated"
          value={stats.graduatedStudents}
          icon={<GraduationCap size={22} />}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Classes</option>
              <option>10-A</option>
              <option>10-B</option>
              <option>11-A</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Roll No
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>


            {/* student table body */}

            <tbody>
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                        {student.userId.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {student.userId.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {student.rollNumber}
                  </td>

                  <td className="px-6 py-4">
                    {student.classId.name}-{student.classId.section}
                  </td>

                  <td className="px-6 py-4">
                    {student.userId.email}
                  </td>

                  <td className="px-6 py-4">
                    {student.userId.phone}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        student.userId.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.userId.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      
                      <button onClick={() => handleViewStudent(student)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer">
                       <Eye size={18} />
                      </button>

                      <button 
                      onClick={()=>handleEditStudent(student)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 cursor-pointer">
                        <Pencil size={18} />
                      </button>

                      <button 
                      onClick={() => handleDeleteStudent(student._id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            Showing 1-4 of 1250 students
          </p>

          <div className="flex gap-2">
            <button className="rounded-lg border px-3 py-1.5">
              Previous
            </button>

            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white">
              1
            </button>

            <button className="rounded-lg border px-3 py-1.5">
              2
            </button>

            <button className="rounded-lg border px-3 py-1.5">
              Next
            </button>
          </div>
        </div>
      </div>

      <StudentDrawer
      open={drawerOpen}
      student={selectedStudent}
      onDelete={handleDeleteStudent}
      onEdit={handleEditStudent}
      onClose={()=>setDrawerOpen(false)}/>

      <StudentModal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleUpdateStudent}
      classes={classes}
    />

    <CreateStudentModal
      open={createOpen}
      onClose={() => setCreateOpen(false)}
      formData={createForm}
      handleChange={handleCreateChange}
      handleSubmit={handleCreateStudent}
      classes={classes}
      users={users}
    />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        {icon}
      </div>

      <h3 className="text-sm text-slate-500">
        {title}
      </h3>

      <p className="mt-1 text-2xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}
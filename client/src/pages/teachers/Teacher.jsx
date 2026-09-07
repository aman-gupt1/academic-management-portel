import React from 'react'
import { useEffect, useState } from "react";
import * as teacherApi from "../../api/teacherApi";
import TeacherDrawer from "../../components/teacher/TeacherDrawer";
import * as userApi from "../../api/userApi";

import PageHeader from "../../components/common/PageHeader";
import TeacherEditModal from "../../components/teacher/TeacherEditModal";
import CreateTeacherModal from "../../components/teacher/CreateTeacherModel";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  GraduationCap,
  UserCheck,
  UserPlus,
  Building2,
} from "lucide-react";

export default function Teacher() {

  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    totalTeachers: 0,
    activeTeachers: 0,
    newTeachers: 0,
    departments: 0,
  });

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedTeacher, setSelectedTeacher]=useState(null);
  const [drawerOpen, setDrawerOpen]=useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    qualification: "",
    subjects: "",
    joinDate: "",
  });

  const [createOpen, setCreateOpen] = useState(false);
  const [teacherUsers, setTeacherUsers] = useState([]);

  

  // fetch teachers stats
  const fetchTeacherStats = async () => {
  try {
    const { data } = await teacherApi.getTeacherStats();
    console.log("Teacher Stats:", data);

    setStats(data.data);
  } catch (error) {
    console.log(error);
  }
};

// fetch all student
  const fetchTeachers = async () => {
  try {
    const { data } = await teacherApi.getTeachers();
    console.log("Teachers:", data);
    setTeachers(data.data);
  } catch (error) {
    console.log(error);
  }
};

// fetch teacher users
const fetchTeacherUsers = async () => {
  try {
    const { data } = await userApi.getTeacherUsers();
    setTeacherUsers(data.data);
  } catch (error) {
    console.log(error);
  }
};

// edit handler form and update 
const handleEdit = (teacher) => {
  setSelectedTeacher(teacher);

  setFormData({
    name: teacher.userId?.name || "",
    email: teacher.userId?.email || "",
    phone: teacher.userId?.phone || "",
    employeeId: teacher.employeeId || "",
    qualification: teacher.qualification || "",
    subjects: teacher.subjects?.join(", ") || "",
    joinDate: teacher.joinDate?.split("T")[0] || "",
  });

  setEditOpen(true);
};

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleUpdate = async () => {
  try {
    const payload = {
      employeeId: formData.employeeId,
      qualification: formData.qualification,
      subjects: formData.subjects
        .split(",")
        .map((item) => item.trim()),
      joinDate: formData.joinDate,
    };

    await teacherApi.updateTeacher(selectedTeacher._id, payload);

    fetchTeachers();

    setEditOpen(false);

    alert("Teacher updated successfully");
  } catch (error) {
    console.log(error);
     console.log(error);
  console.log(error.response?.data);
    alert("Failed to update teacher");
  }
};

// handle create teacher function 
const handleCreateTeacher = async (formData) => {
  try {
    const payload = {
      userId: formData.userId,
      employeeId: formData.employeeId,
      qualification: formData.qualification,
      subjects: formData.subjects
        .split(",")
        .map((item) => item.trim()),
      joinDate: formData.joinDate,
    };

    await teacherApi.createTeacher(payload);

    fetchTeachers();
    fetchTeacherStats();

    setCreateOpen(false);

    alert("Teacher created successfully");
  } catch (error) {
    console.log(error);
    alert(
      error.response?.data?.message ||
      "Failed to create teacher"
    );
  }
};


// handle delete function
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this teacher?"
  );

  if (!confirmDelete) return;

  try {
    await teacherApi.deleteTeacher(id);

    fetchTeachers();

    alert("Teacher deleted successfully");
  } catch (error) {
    console.log(error);
    alert("Failed to delete teacher");
  }
};

  useEffect(() => {
  fetchTeacherStats();
  fetchTeachers();
  fetchTeacherUsers();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers Management"
        subtitle="Manage all teachers and faculty members."
        action={
          <button 
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add Teacher
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Teachers"
           value={stats.totalTeachers}
          icon={<GraduationCap size={22} />}
        />

        <StatCard
          title="Active Teachers"
            value={stats.activeTeachers}
          icon={<UserCheck size={22} />}
        />

        <StatCard
          title="New Hires"
          value={stats.newTeachers}
          icon={<UserPlus size={22} />}
        />

        <StatCard
          title="Departments"
          value={stats.departments}
          icon={<Building2 size={22} />}
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
              placeholder="Search teachers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Departments</option>
              <option>Science</option>
              <option>Commerce</option>
              <option>Arts</option>
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

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Employee ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Qualification
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Subjects
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

            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  {/* Teacher */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                        {teacher.userId?.name?.charAt(0) || "T"}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {teacher.userId?.name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Employee ID */}
                  <td className="px-6 py-4">
                    {teacher.employeeId}
                  </td>

                  {/* Qualification */}
                  <td className="px-6 py-4">
                    {teacher.qualification}
                  </td>

                  {/* Subjects */}
                  <td className="px-6 py-4">
                    {teacher.subjects?.join(", ")}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    {teacher.userId?.email || "N/A"}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4">
                    {teacher.userId?.phone || "N/A"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        teacher.userId?.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.userId?.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                      onClick={()=>{
                        setSelectedTeacher(teacher)
                        setDrawerOpen(true)
                      }}
                      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                        <Eye size={18} />
                      </button>

                      <button 
                      onClick={() => handleEdit(teacher)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                        <Pencil size={18} />
                      </button>

                      <button 
                      onClick={() => handleDelete(teacher._id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50">
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
            Showing 1-4 of 85 teachers
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

      <TeacherDrawer
        open={drawerOpen}
        teacher={selectedTeacher}
        onClose={() => setDrawerOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TeacherEditModal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleUpdate}
    />

    <CreateTeacherModal
      open={createOpen}
      onClose={() => setCreateOpen(false)}
      teacherUsers={teacherUsers}
      onCreate={handleCreateTeacher}
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
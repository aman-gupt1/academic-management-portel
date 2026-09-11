import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ClassEditModal from "../../components/classes/ClassEditModal.jsx";
import * as classApi from '../../api/classApi.js'
import ClassDrawer from "../../components/classes/ClassDrawer";
import * as teacherApi from "../../api/teacherApi.js";
import CreateClassModal from "../../components/classes/CreateClassModel.jsx";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  School,
  Users,
  DoorOpen,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";

export default function Classes() {
  const [search, setSearch] = useState("");
  const [stat, setStat] = useState({
  totalClasses: 0,
  activeClasses: 0,
  totalStudents: 0,
  rooms: 0,
  });

  const [classes, setClasses] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  section: "",
  academicYear: "",
  classTeacherId: "",
});

  // fetch stats
  const getClassStats=async()=>{
    try {
      const response= await classApi.getClassStats()
      setStat(response.data.data)
      
    } catch (error) {
      console.log("Stats Error :", error.message)
    }
  }

  // fetch classes
  const fetchClasses = async () => {
  try {
    const response = await classApi.getClasses();

    

    setClasses(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

// delete classes
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this class?"
  );

  if (!confirmDelete) return;

  try {
    await classApi.deleteClass(id);

    fetchClasses();
    getClassStats();

    alert("Class deleted successfully");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete class"
    );
  }
};


// fetch teachers
const fetchTeachers = async () => {
  try {
    const { data } = await teacherApi.getTeachers();

    setTeachers(data.data);

  } catch (error) {
    console.log(error);
  }
};

// create classes
const handleCreateClass = async (formData) => {
  try {
    await classApi.createClass(formData);

    fetchClasses();
    getClassStats();

    setCreateOpen(false);

    alert("Class created successfully");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to create class"
    );
  }
};

// handle edit and change
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleEdit = (item) => {
  setSelectedClass(item);

  setFormData({
    name: item.name || "",
    section: item.section || "",
    academicYear: item.academicYear || "",
    classTeacherId: item.classTeacherId?._id || "",
  });

  setEditOpen(true);
};

const handleUpdate = async () => {
  try {
    await classApi.updateClass(
      selectedClass._id,
      formData
    );

    fetchClasses();
    getClassStats();

    setEditOpen(false);

    alert("Class updated successfully");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update class"
    );
  }
};


  useEffect(()=>{
    getClassStats()
    fetchClasses();
    fetchTeachers();
  },[])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes Management"
        subtitle="Manage classes, sections and class teachers."
        action={
          <button 
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add Class
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Classes"
          value={stat.totalClasses}
          icon={<School size={22} />}
        />

        <StatCard
          title="Active Classes"
         value={stat.activeClasses}
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Rooms"
          value={stat.rooms}
          icon={<DoorOpen size={22} />}
        />

        <StatCard
          title="Students"
          value={stat.totalStudents}
          icon={<Users size={22} />}
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
              placeholder="Search classes..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Grades</option>
              <option>Class 9</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Sections</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Section
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Students
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Room
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
              {classes.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.section}
                  </td>

                  <td className="px-6 py-4">
                    {item.classTeacherId?.userId?.name || "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    -
                  </td>

                  <td className="px-6 py-4">
                    -
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive?"Active":"Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                      onClick={() => {
                      setSelectedClass(item);
                      setDrawerOpen(true);
                    }}
                      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 cursor-pointer">
                        <Eye size={18} />
                      </button>

                      <button 
                      onClick={() => handleEdit(item)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 cursor-pointer">
                        <Pencil size={18} />
                      </button>

                      <button 
                       onClick={() => handleDelete(item._id)}
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
            Showing 1-4 of 42 classes
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
      <ClassDrawer
        open={drawerOpen}
        classData={selectedClass}
        onClose={() => setDrawerOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateClassModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        teachers={teachers}
        onCreate={handleCreateClass}
      />

      <ClassEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
        teachers={teachers}
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

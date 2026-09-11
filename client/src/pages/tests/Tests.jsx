
import PageHeader from "../../components/common/PageHeader";
import { useEffect, useState } from "react";
import * as testApi from "../../api/testApi.js";
import * as classApi from "../../api/classApi";
import * as teacherApi from "../../api/teacherApi";
import CreateTestModal from "../../components/tests/CreateTestModal.jsx";
import TestDetailsDrawer from "../../components/tests/TestDetailsDrawer";

import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  ClipboardCheck,
  CalendarDays,
  CheckCircle,
  BookOpen,
} from "lucide-react";

export default function Tests() {

const [search, setSearch] = useState("");
const [stats, setStats] = useState({
  totalTests: 0,
  upcomingTests: 0,
  completedTests: 0,
  scheduledTests: 0,
});

  const [tests, setTests] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [openViewDrawer, setOpenViewDrawer]=useState(false);
  const [selectedTest, setSelectedTest]=useState(null);

  const [editTest, setEditTest] = useState(null);

  // fetch classes 
  const fetchClasses = async () => {
  try {
    const response = await classApi.getClasses();

    setClasses(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

  // get stats 
  const getTestStats = async () => {
  try {
    const response =
      await testApi.getTestStats();

    setStats(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

const fetchTests = async () => {
  try {
    const response =
      await testApi.getTests();

    setTests(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

// fetch teachers
const fetchTeachers = async () => {
  try {
    const response = await teacherApi.getTeachers();
    setTeachers(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

// handle delete utton 
const handleDeleteTest = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this test?"
  );

  if (!confirmDelete) return;

  try {
    await testApi.deleteTest(id);

    fetchTests();
    getTestStats();

    alert("Test deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

const handleCreateTest = async (formData) => {
   console.log(formData);
  try {
    await testApi.createTest(formData);

    await fetchTests();
    await getTestStats();

    setOpenCreateModal(false);

    alert("Test created successfully");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to create test"
    );
  }
};

// HANDLE EDIT 

const handleSaveTest = async (formData) => {
  try {

    if (editTest) {

      await testApi.updateTest(
        editTest._id,
        formData
      );

      alert("Test updated successfully");

    } else {

      await testApi.createTest(
        formData
      );

      alert("Test created successfully");
    }

    fetchTests();
    getTestStats();

    setOpenCreateModal(false);
    setEditTest(null);

  } catch (error) {
    console.log(error);
  }
};

// handle update test
const handleUpdateTest = async (formData) => {
  try {
    await testApi.updateTest(
      editTest._id,
      formData
    );

    await fetchTests();
    await getTestStats();

    setOpenCreateModal(false);
    setEditTest(null);

    alert("Test updated successfully");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update test"
    );
  }
};

useEffect(() => {
  getTestStats();
  fetchTests();
  fetchClasses();
  fetchTeachers();
}, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tests Management"
        subtitle="Create, schedule and manage academic tests."
        action={
          <button 
          onClick={() => setOpenCreateModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700">
            <Plus size={18} />
            Create Test
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tests"
          value={stats.totalTests}
          icon={<ClipboardCheck size={22} />}
        />

        <StatCard
          title="Upcoming This Week"
          value={stats.upcomingTests}
          icon={<CalendarDays size={22} />}
        />

        <StatCard
          title="Completed Tests"
          value={stats.completedTests}
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Scheduled Tests"
          value={stats.scheduledTests}
          icon={<BookOpen size={22} />}
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
              placeholder="Search tests..."
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
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Status</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
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
                  Test Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Max Marks
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Duration
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
      {tests.map((test) => {

        const status =
          new Date(test.testDate) > new Date()
            ? "Upcoming"
            : "Completed";

    return (
      <tr
        key={test._id}
        className="border-t border-slate-100 hover:bg-slate-50"
      >
        <td className="px-6 py-4 font-medium text-slate-800">
          {test.title}
        </td>

        <td className="px-6 py-4">
          {test.subject}
        </td>

        <td className="px-6 py-4">
          {test.classId?.name} - {test.classId?.section}
        </td>

        <td className="px-6 py-4">
          {new Date(test.testDate).toLocaleDateString()}
        </td>

        <td className="px-6 py-4">
          {test.totalMarks}
        </td>

        <td className="px-6 py-4">
          {test.duration || "-"} Min
        </td>

        <td className="px-6 py-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "Upcoming"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {status}
          </span>
        </td>

        <td className="px-6 py-4">
          <div className="flex justify-center gap-2">
            <button 
            onClick={() => {
              setSelectedTest(test);
              setOpenViewDrawer(true);
            }}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
              <Eye size={18} />
            </button>

            <button 
            onClick={() => {
              setEditTest(test);
              setOpenCreateModal(true);
            }}
            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
              <Pencil size={18} />
            </button>

            <button 
            onClick={() => handleDeleteTest(test._id)}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50">
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 p-4">
          <p className="text-sm text-slate-500">
            Showing 1-4 of 35 tests
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

      <CreateTestModal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
          setEditTest(null);
        }}
        onSubmit={
    editTest
      ? handleUpdateTest
      : handleCreateTest
  }
        classes={classes}
        teachers={teachers}
        editData={editTest}
      />

      <TestDetailsDrawer
        open={openViewDrawer}
        onClose={() => {
          setOpenViewDrawer(false);
          setSelectedTest(null);
        }}
        test={selectedTest}
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

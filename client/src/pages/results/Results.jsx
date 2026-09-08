import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ResultDrawer from "../../components/results/ResultDrawer.jsx";
import * as resultApi from "../../api/resultApi.js";
import * as testApi from "../../api/testApi.js";
import * as studentApi from "../../api/studentApi.js";
import ResultModal from "../../components/results/ResultModel.jsx";

import {
  Trophy,
  Users,
  TrendingUp,
  Award,
  Search,
  Download,
  Eye,
  Plus,
} from "lucide-react";

export default function Results() {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);

  const [stats, setStats] = useState({
    totalResults: 0,
    passRate: 0,
    averageScore: 0,
    topPerformer: null,
  });

const [selectedResult, setSelectedResult] = useState(null);
const [openDrawer, setOpenDrawer] = useState(false);

const [openModal, setOpenModal] = useState(false);
const [editResult, setEditResult] = useState(null);
const [tests, setTests] = useState([]);
const [students, setStudents] = useState([]);

// get fetch result statss
  const getResultStats = async () => {
  try {
    const response = await resultApi.getResultStats();

    setStats(response.data.data);

  } catch (error) {
    console.log(error);
  }
};


// get all results
const getAllResults = async () => {
  try {
    const response = await resultApi.getResults();

    setResults(response.data.data);
    
  } catch (error) {
    console.log(error);
  }
};


const handleEdit = (result) => {
  setEditResult(result);
  setOpenModal(true);

};


const handleDelete = async (id) => {

  const ok = window.confirm(
    "Delete this result?"
  );

  if (!ok) return;

  try {

    await resultApi.deleteResult(id);

    getAllResults();

    getResultStats();

  } catch (error) {
    console.log(error);
  }
};


const handleCreateResult = async (
  formData
) => {
  try {

    await resultApi.createResult(
      formData
    );

    getAllResults();

    getResultStats();

    setOpenModal(false);

  } catch (error) {
    console.log(error);
  }
};

const handleUpdateResult = async (
  formData
) => {
  try {

    await resultApi.updateResult(
      editResult._id,
      formData
    );

    getAllResults();

    getResultStats();

    setEditResult(null);

    setOpenModal(false);

  } catch (error) {
    console.log(error);
  }
};

const getAllTests = async () => {
  try {

    const response =
      await testApi.getTests({
        all: true,
      });

    setTests(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async () => {
  try {

    const response =
      await studentApi.getStudents({
        all: true,
      });

    setStudents(response.data.data);

  } catch (error) {
    console.log(error);
  }
};


const handleSubmitResult = (formData) => {

  if (editResult) {
    handleUpdateResult(formData);
  } else {
    handleCreateResult(formData);
  }

};

useEffect(() => {
  getResultStats();
  getAllResults();
   getAllTests();
  getAllStudents();
}, []);


  return (
    <div className="space-y-6">
      <PageHeader
        title="Results Management"
        subtitle="Track academic performance and examination results."
        action={
          <button 
          onClick={() => {
        setEditResult(null);
        setOpenModal(true);
      }}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Create Results
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Results"
          value={stats.totalResults}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Pass Rate"
          value={`${stats.passRate}%`}
          icon={<TrendingUp size={22} />}
        />

       <StatCard
          title="Top Performance"
          value={
            stats.topPerformer
              ? `${stats.topPerformer.marksObtained}`
              : "-"
          }
          icon={<Trophy size={22} />}
        />

        <StatCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          icon={<Award size={22} />}
        />
      </div>

      {/* Top Performers */}
      {/* <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Top Performers
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">
            <div>
              <p className="font-medium">
                🥇 Aman Gupta
              </p>
              <p className="text-sm text-slate-500">
                Class 10-A
              </p>
            </div>

            <span className="font-semibold text-yellow-700">
              95%
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="font-medium">
                🥈 Priya Sharma
              </p>
              <p className="text-sm text-slate-500">
                Class 10-A
              </p>
            </div>

            <span className="font-semibold">
              93%
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div>
              <p className="font-medium">
                🥉 Rahul Kumar
              </p>
              <p className="text-sm text-slate-500">
                Class 11-B
              </p>
            </div>

            <span className="font-semibold">
              91%
            </span>
          </div>
        </div>
      </div> */}

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
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Classes</option>
              <option>Class 10</option>
              <option>Class 11</option>
              <option>Class 12</option>
            </select>

            <select className="rounded-xl border border-slate-200 px-4 py-2">
              <option>All Exams</option>
              <option>Mid Term</option>
              <option>Final Exam</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Student
                </th>
                <th className="px-6 py-4 text-left">
                  Class
                </th>
                <th className="px-6 py-4 text-left">
                  Exam
                </th>
                <th className="px-6 py-4 text-left">
                  Percentage
                </th>
                <th className="px-6 py-4 text-left">
                  Grade
                </th>
                <th className="px-6 py-4 text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

                {/* table body */}
            <tbody>
              {results.map((result) => {

                const percentage = (
                  (result.marksObtained /
                    result.testId?.totalMarks) *
                  100
                ).toFixed(1);

                return (
                  <tr
                    key={result._id}
                    className="border-t hover:bg-slate-50"
                  >
                    {/* Student */}
                    <td className="px-6 py-4 font-medium">
                      {result.studentId?.userId?.name || "N/A"}
                    </td>

                    {/* Class */}
                    <td className="px-6 py-4">
                      {result.testId?.classId?.name}-
                      {result.testId?.classId?.section}
                    </td>

                    {/* Exam */}
                    <td className="px-6 py-4">
                      {result.testId?.title}
                    </td>

                    {/* Percentage */}
                    <td className="px-6 py-4 font-semibold">
                      {percentage}%
                    </td>

                    {/* Grade */}
                    <td className="px-6 py-4">
                      {result.grade}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          Number(percentage) >= 40
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {Number(percentage) >= 40
                          ? "Pass"
                          : "Fail"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => {
                          setSelectedResult(result);
                          setOpenDrawer(true);
                        }}
                      className="rounded-lg p-2 hover:bg-slate-100">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ResultDrawer
        open={openDrawer}
        result={selectedResult}
        onClose={() => setOpenDrawer(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ResultModal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setEditResult(null);
      }}
      onSubmit={handleSubmitResult}
      tests={tests}
      students={students}
      editData={editResult}
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
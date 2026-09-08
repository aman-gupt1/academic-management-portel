import {Users, GraduationCap, School, FileText,Trophy, Activity, Plus, User2Icon,} from "lucide-react";
import { useState, useEffect } from "react";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivities from "../../components/dashboard/RecentActivities";
import RecentStudents from "../../components/dashboard/RecentStudents";
import RecentTeachers from "../../components/dashboard/RecentTeachers";
import { useNavigate } from "react-router-dom";
import UserModal from "../../components/dashboard/UserModel.jsx";

import *  as dashboardApi from '../../api/dashboardApi.js'
import * as authApi from "../../api/autApi.js";

export default function Dashboard() {
const [dashboardStats, setDashboardStats] = useState(null);
const [loading, setLoading] = useState(true);
const [openUserModal, setOpenUserModal] = useState(false);

const navigate = useNavigate();


// fetch dashboard stats from backend
const fetchDashboardStats = async () => {
  try {
    setLoading(true);

    const { data } = await dashboardApi.getDashboardStats();

    setDashboardStats(data.data); // ya data, response structure par depend karega
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const handleRegisterUser = async (
  userData
) => {
  try {
    await authApi.registerUser(userData);

    setOpenUserModal(false);

    alert("User registered successfully");
  } catch (error) {
    console.log(error);

    alert(
      error?.response?.data?.message ||
        "Registration failed"
    );
  }
};

useEffect(() => {
  fetchDashboardStats();
}, []);


// stats card data
  const stats = [
  {
    title: "Students",
    value: dashboardStats?.totalStudents || 0,
    icon: Users,
  },
  {
    title: "Teachers",
    value: dashboardStats?.totalTeachers || 0,
    icon: GraduationCap,
  },
  {
    title: "Classes",
    value: dashboardStats?.totalClasses || 0,
    icon: School,
  },
  {
    title: "Tests",
    value: dashboardStats?.totalTests || 0,
    icon: FileText,
  },
  {
    title: "Results",
    value: dashboardStats?.totalResults || 0,
    icon: Trophy,
  },
  {
    title: "Activities",
    value: dashboardStats?.totalActivities || 0,
    icon: Activity,
  },
];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening in your institution today."
       action={
  <button 
  onClick={() => setOpenUserModal(true)}
    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer">
       <User2Icon size={18} />
      Register User
         </button>
              }
      />
      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Activities + Actions */}
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentActivities />
        <QuickActions />
      </div>

      {/* Students + Teachers */}
      <div className="grid gap-6 xl:grid-cols-2">
        <RecentStudents />
        <RecentTeachers />
      </div>

      <UserModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onSubmit={handleRegisterUser}
      />
    </div>
  );
}
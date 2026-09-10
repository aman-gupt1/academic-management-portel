import {Users, GraduationCap, School, FileText,Trophy, Activity, Plus, User2Icon,} from "lucide-react";
import { useState, useEffect } from "react";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import UserDistribution from "../../components/dashboard/UserDistribution.jsx";
import { useNavigate } from "react-router-dom";
import UserModal from "../../components/dashboard/UserModel.jsx";

import *  as dashboardApi from '../../api/dashboardApi.js'
import * as authApi from "../../api/autApi.js";
import * as userApi from '../../api/userApi.js'

export default function Dashboard() {
const [dashboardStats, setDashboardStats] = useState(null);
const [loading, setLoading] = useState(true);
const [openUserModal, setOpenUserModal] = useState(false);
const [userDistribution, setUserDistribution] =
  useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmins: 0,
  });

const navigate = useNavigate();

// get user distibution
const fetchUserDistribution= async()=>{
 try {
  const { data } = await userApi.getUserDistribution();
  console.log("User Distribution Data: ",data.data);
   setUserDistribution(data.data);
 } catch (error) {
  console.log("USER DISTRIBUTION ERROR: ", error.message)
 }
}

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
  fetchUserDistribution();
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

      {/* UserDistribution + Actions */}
      <div className="grid gap-6 xl:grid-cols-2">
        <UserDistribution
  totalStudents={
    userDistribution.totalStudents
  }
  totalTeachers={
    userDistribution.totalTeachers
  }
  totalAdmins={
    userDistribution.totalAdmins
  }
/>
        <QuickActions />
      </div>


      <UserModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onSubmit={handleRegisterUser}
      />
    </div>
  );
}
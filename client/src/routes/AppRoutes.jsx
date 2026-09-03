import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";

import Students from "../pages/students/Students";
import Teacher from "../pages/teachers/Teacher";
import Classes from "../pages/classes/Classes";
import Attendance from "../pages/attendance/Attendance";
import Tests from "../pages/tests/Tests";
import Results from "../pages/results/Results";
import Activities from "../pages/activities/Activities";


import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>

        {/* login page route */}
      <Route path="/login" element={<Login />}/>
      
        {/* dashboard route */}
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/students" element={<Students />}/>
        <Route path="/teachers" element={<Teacher />}/>
        <Route path="/classes" element={<Classes />}/>
        <Route path="/attendance" element={<Attendance />}/>
        <Route path="/tests" element={<Tests />}/>
        <Route path="/results" element={<Results/>}/>
        <Route path="/activities" element={<Activities/>}/>
        


      </Route>

        {/* wildcare route if no one is match , it  catches */}
      <Route path="*" element={<Navigate to="/login" replace />}/>

    </Routes>
  );
}
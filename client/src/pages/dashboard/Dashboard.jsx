import {
  Users,
  GraduationCap,
  School,
  FileText,
  Trophy,
  Activity,
} from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivities from "../../components/dashboard/RecentActivities";
import RecentStudents from "../../components/dashboard/RecentStudents";
import RecentTeachers from "../../components/dashboard/RecentTeachers";

export default function Dashboard() {
  const stats = [
    {
      title: "Students",
      value: "1,250",
      icon: Users,
    },
    {
      title: "Teachers",
      value: "85",
      icon: GraduationCap,
    },
    {
      title: "Classes",
      value: "42",
      icon: School,
    },
    {
      title: "Tests",
      value: "35",
      icon: FileText,
    },
    {
      title: "Results",
      value: "120",
      icon: Trophy,
    },
    {
      title: "Activities",
      value: "250",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening in your institution today."/>
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
    </div>
  );
}
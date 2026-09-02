import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as authApi from "../../api/autApi";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  CalendarCheck,
  FileText,
  Trophy,
  Activity,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    path: "/students",
    icon: Users,
  },
  {
    name: "Teachers",
    path: "/teachers",
    icon: GraduationCap,
  },
  {
    name: "Classes",
    path: "/classes",
    icon: School,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Tests",
    path: "/tests",
    icon: FileText,
  },
  {
    name: "Results",
    path: "/results",
    icon: Trophy,
  },
  {
    name: "Activities",
    path: "/activities",
    icon: Activity,
  },
];

export default function Sidebar({isOpen, onClose,}){
 const navigate = useNavigate();
 
//  logout function
    const handleLogout= async ()=>{
      try {
        await authApi.logout();
        alert("Logout successful");
         navigate("/login");
         localStorage.clear();
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Logout failed")
      }
    }

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 flex min-h-screen w-64
        flex-col border-r border-slate-200 bg-white
        transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:relative lg:min-h-screen lg:w-64 lg:flex-shrink-0 lg:translate-x-0
      `}
    >
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">
            Academexa
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Academic Management
          </p>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button 
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50 cursor-pointer">
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
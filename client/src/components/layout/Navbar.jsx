import {Menu,Bell,Search,User,} from "lucide-react";

import { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ProfileDropdown from "../common/ProfileDropdown";
import * as authApi from "../../api/autApi";

export default function Navbar({onMenuClick,}){

  // get logged user from local storage
  const user = JSON.parse(localStorage.getItem("user"));

const navigate = useNavigate();
const [open, setOpen] = useState(false);
const dropdownRef = useRef(null);
 

// handle click outside logic 

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);


  // ===== logout function
const handleLogout = async () => {
  try {
    await authApi.logout();
    localStorage.removeItem("user");
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">

        {/* menu button for mobile screen to open sidebar */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* <div>
          <h1 className="text-lg font-semibold text-slate-800">
            Dashboard
          </h1>

          <p className="hidden text-sm text-slate-500 sm:block">
            Welcome back to Academexa
          </p>
        </div> */}
      </div>

      <div className="hidden w-full max-w-md lg:block">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
          <Search size={20} />
        </button>

        {/* well for notification */}

        <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-2 py-1.5 hover:bg-slate-50 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <User
              size={18}
              className="text-indigo-600"
            />
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-slate-800">
              {user.name}
            </p>

            <p className="text-xs text-slate-500">
              {user.role}
            </p>
          </div>
        </button> */}

      <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)}
      className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-2 py-1.5 hover:bg-slate-50">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
      <User size={18} className="text-indigo-600"/>
    </div>

    <div className="hidden text-left md:block">
      <p className="text-sm font-medium text-slate-800">
        {user?.name}
      </p>

      <p className="text-xs text-slate-500">
        {user?.role}
      </p>
    </div>
  </button>

{/* profile dropdown */}
  {open && (<ProfileDropdown user={user} onLogout={handleLogout}/>)}
</div>
      </div>
    </header>
  );
}
import {
  User,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfileDropdown({
  user,
  onLogout,
}) {
  return (
    <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

      {/* User Info */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 text-white">
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <User size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">
              {user?.name}
            </h3>

            <p className="truncate text-xs text-white/80">
              {user?.email}
            </p>

            <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium uppercase">
              {user?.role}
            </span>
          </div>

        </div>
      </div>

      {/* Menu */}
      <div className="p-2">

        <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100">
          <div className="flex items-center gap-3">
            <User size={18} />
            <span>My Profile</span>
          </div>

          <ChevronRight size={16} />
        </button>

        <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100">
          <div className="flex items-center gap-3">
            <Settings size={18} />
            <span>Account Settings</span>
          </div>

          <ChevronRight size={16} />
        </button>

        <button className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100">
          <div className="flex items-center gap-3">
            <Bell size={18} />
            <span>Notifications</span>
          </div>

          <ChevronRight size={16} />
        </button>

      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-2">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}
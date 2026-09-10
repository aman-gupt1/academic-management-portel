import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Clock,
  Edit,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-toastify";

import * as userApi from '../../api/userApi.js'
import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

export default function Profile() {




const [showPasswordModal, setShowPasswordModal] = useState(false);
const [passwordData, setPasswordData] =useState({
    currentPassword: "",
    newPassword: "",
  });

const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);


// handle password
const handleUpdatePassword = async () => {
  try {
    const response = await userApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success(
      response.data.message ||
      "Password updated successfully"
    );

    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });

    setShowPasswordModal(false);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to update password"
    );
  }
};

const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

  const user = JSON.parse(localStorage.getItem("user")) || {};
console.log("LOCAL STORAGE DATA: ", user)
  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account information and security settings."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {user.profileImg ? (
              <img
                src={user.profileImg}
                alt={user.name}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
                {initials}
              </div>
            )}

            <h2 className="mt-5 text-2xl font-bold text-slate-800">
              {user.name || "User"}
            </h2>

            <p className="mt-1 text-slate-500">
              {user.email || "N/A"}
            </p>

            <span className="mt-4 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium capitalize text-indigo-700">
              {user.role || "User"}
            </span>
          </div>
        </div>

        {/* Account Details */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-semibold text-slate-800">
            Account Information
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Email */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Mail
                  size={20}
                  className="text-indigo-600"
                />
                <span className="font-medium text-slate-700">
                  Email Address
                </span>
              </div>

              <p className="text-slate-600">
                {user.email || "N/A"}
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Phone
                  size={20}
                  className="text-indigo-600"
                />
                <span className="font-medium text-slate-700">
                  Phone Number
                </span>
              </div>

              <p className="text-slate-600">
                {user.phone || "Not Available"}
              </p>
            </div>

            {/* Role */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Shield
                  size={20}
                  className="text-indigo-600"
                />
                <span className="font-medium text-slate-700">
                  User Role
                </span>
              </div>

              <p className="capitalize text-slate-600">
                {user.role || "User"}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Shield
                  size={20}
                  className="text-indigo-600"
                />
                <span className="font-medium text-slate-700">
                  Account Status
                </span>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Active
              </span>
            </div>

            {/* Last Login */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Clock
                  size={20}
                  className="text-indigo-600"
                />
                <span className="font-medium text-slate-700">
                  Last Login
                </span>
              </div>

              <p className="text-slate-600">
                {user.lastLogin || "Not Available"}
              </p>
            </div>

            {/* Joined */}
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="mb-3 flex items-center gap-3">
                <Calendar
                  size={20}
                  className="text-indigo-600"
                />
                <span className="font-medium text-slate-700">
                  Joined On
                </span>
              </div>

              <p className="text-slate-600">
                {user.createdAt || "Not Available"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
              <Edit size={18} />
              Edit Profile
            </button>

            <button 
             onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100">
              <KeyRound size={18} />
              Change Password
            </button>
          </div>
        </div>
      </div>
      {showPasswordModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

      <h3 className="mb-6 text-xl font-bold text-slate-800">
        Change Password
      </h3>

      <div className="space-y-4">

  {/* Current Password */}
  <div className="relative">
    <input
      type={
        showCurrentPassword
          ? "text"
          : "password"
      }
      name="currentPassword"
      value={passwordData.currentPassword}
      onChange={handlePasswordChange}
      placeholder="Current Password"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-indigo-500"
    />

    <button
      type="button"
      onClick={() =>
        setShowCurrentPassword(
          !showCurrentPassword
        )
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
    >
      {showCurrentPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>

  {/* New Password */}
  <div className="relative">
    <input
      type={
        showNewPassword
          ? "text"
          : "password"
      }
      name="newPassword"
      value={passwordData.newPassword}
      onChange={handlePasswordChange}
      placeholder="New Password"
      className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-indigo-500"
    />

    <button
      type="button"
      onClick={() =>
        setShowNewPassword(
          !showNewPassword
        )
      }
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
    >
      {showNewPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>

</div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() =>
            setShowPasswordModal(false)
          }
          className="flex-1 rounded-xl border border-slate-300 py-3 font-medium"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdatePassword}
          className="flex-1 rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Update Password
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}
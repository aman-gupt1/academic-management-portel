import { useState, useEffect} from "react";
import {
  Users,
  GraduationCap,
  Shield,
  Eye,
  Search,
  Plus,
  Edit,
  Trash2,
  School,
  CheckCircle,
  Ban,
} from "lucide-react";
import * as userApi from '../../api/userApi.js'
import { toast } from "react-toastify";
import * as authApi from "../../api/autApi.js";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import UserModal from "../../components/dashboard/UserModel.jsx";

export default function UsersPage() {

const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [openUserModal, setOpenUserModal] = useState(false);
const [userStats, setUserStats] = useState({
  totalUsers: 0,
  totalStudents: 0,
  totalTeachers: 0,
  totalAdmins: 0,
  activeUsers: 0,
  blockedUsers: 0,
});



 const handleRoleChange = async (
  userId,
  role
) => {

  try {

    await userApi.updateUserRole(
      userId,
      role
    );

    fetchUsers();

  } catch (error) {

    console.log(error);

  }

};

 const handleStatusToggle = async (
  userId
) => {

  try {

    await userApi.updateUserStatus(
      userId
    );

    fetchUsers();
    fetchUserDistribution();

  } catch (error) {

    console.log(error);

  }

};

const handleRegisterUser = async (userData) => {
  try {
    const { data } =
      await authApi.registerUser(userData);

    toast.success(data.message);

    setOpenUserModal(false);

    fetchUsers();
    fetchUserDistribution();

  } catch (error) {

    toast.error(
      error?.response?.data?.message ||
      "Registration failed"
    );
  }
};
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );


//   fetch users 
const fetchUsers = async () => {
  try {
    setLoading(true);

    const { data } = await userApi.getAllUsers();
    setUsers(data.data);
    console.log("User Data", data.data)

  } catch (error) {
    console.log(
      "FETCH USERS ERROR:",
      error
    );
  } finally {
    setLoading(false);
  }
};

// fetchuserdistribution
const fetchUserDistribution = async () => {
  try {
    const { data } = await userApi.getUserDistribution();

    setUserStats(data.data);
  } catch (error) {
    console.log(
      "USER DISTRIBUTION ERROR:",
      error
    );
  }
};

// handle delete users
const handleDeleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await userApi.deleteUser(id);

    toast.success(data.message);

    // Refresh Users List
    fetchUsers();

    // Refresh Stats
    fetchUserDistribution();

  } catch (error) {
    console.log(error);

    toast.error(
      error?.response?.data?.message ||
      "Failed to delete user"
    );
  }
};

useEffect(() => {
  fetchUsers();
  fetchUserDistribution();
}, []);

const {
  totalUsers = 0,
  totalStudents = 0,
  totalTeachers = 0,
  activeUsers = 0,
  blockedUsers = 0,
} = userStats || {};

  return (
    <div className="space-y-8">
      <PageHeader
        title="Users Management"
        subtitle="Manage all system users, roles and account status."
        action={
          <button 
           onClick={() => setOpenUserModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Plus size={18} />
            Add User
          </button>
        }
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
        />

        <StatCard
          title="Students"
          value={totalStudents}
          icon={GraduationCap}
        />

        <StatCard
          title="Teachers"
          value={totalTeachers}
          icon={Shield}
        />

        <StatCard
          title="Blocked Users"
          value={blockedUsers}
          icon={Shield}
        />
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
          />
        </div>
      </div>


      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Last Login
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Created
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-medium text-slate-800">
                        {user.name}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </td>

      
                    {/* role dropdown + role */}
                  <td className="px-6 py-4">
                    {user.role === "student" ? (

                      <span className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-700 capitalize">
                        {user.role}
                      </span>

                    ) : (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
                      >
                        <option value="admin">
                          Admin
                        </option>

                        <option value="teacher">
                          Teacher
                        </option>
                      </select>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleStatusToggle(
                          user._id
                        )
                      }
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive
                        ? "Active"
                        : "Blocked"}
                    </button>
                  </td>

                        <td className="px-6 py-4 text-slate-600">
                        {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString(
                                "en-GB",
                                {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                }
                            )
                            : "Never"}
                        </td>
                    <td className="px-6 py-4 text-slate-600">
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                }
                            )
                            : "N/A"}
                        </td>

                  
                    <td className="px-6 py-4">
                <div className="flex items-center gap-2">

                    <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                    title="Delete User"
                    >
                    <Trash2 size={16} />
                    </button>

                </div>
                </td>
                 
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-slate-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onSubmit={handleRegisterUser}
        />
    </div>
  );
}
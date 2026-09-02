import { useState } from "react";
import {GraduationCap, Mail, Lock, Eye,EyeOff} from "lucide-react";

import { useNavigate } from "react-router-dom";
import * as authApi from "../../api/autApi.js";

export default function Login() {

  const navigate=useNavigate()
  const[formData, setFormData]=useState({email:"",password:""})
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    try {
      const {data} = await authApi.login(formData);
      console.log(data);

      // store user info in local storage
      localStorage.setItem("user", JSON.stringify(data.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Login failed")
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-16 text-white">
          <div className="max-w-md">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                <GraduationCap size={40} />
              </div>

              <h1 className="text-5xl font-bold">
                Academexa
              </h1>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight">
              Academic
              <br />
              Management
              <br />
              Platform
            </h2>

            <p className="mb-10 text-lg text-white/90">
              Simplify academic operations and manage
              your institution efficiently from a
              single dashboard.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                📚 Students Management
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                👨‍🏫 Teachers Management
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                🏫 Classes & Attendance
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                📊 Results & Performance Tracking
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-slate-800">
                Welcome Back 👋
              </h2>

              <p className="text-slate-500">
                Sign in to continue to Academexa
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="aman.dev@gmail.com"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none transition focus:border-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                  />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-700"
              >
                Login
              </button>
            </form>

            <div className="mt-8 border-t pt-6 text-center text-sm text-slate-500">
              © 2026 Academexa. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
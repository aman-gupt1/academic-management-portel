import { useState } from "react";
import {
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import  * as authApi from '../../api/autApi.js'

import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    console.log("This is token here ")

    try {
      console.log(
        "Reset Token:",
        token
      );

      console.log(
        "New Password:",
        formData.password
      );
      const response = await authApi.resetPassword(token, formData.password)

      alert(
        "Password reset successfully"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to reset password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">

        {/* Left Side */}
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

        {/* Right Side */}
        <div className="flex w-full items-center justify-center p-6 lg:w-1/2">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-slate-800">
                Reset Password 🔒
              </h2>

              <p className="text-slate-500">
                Enter your new password
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Password
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
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter new password"
                    required
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none focus:border-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Confirm password"
                    required
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none focus:border-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Reset Password
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/")
                }
                className="w-full rounded-xl border border-slate-300 py-3 font-medium hover:bg-slate-50"
              >
                Back To Login
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../features/auth/authHooks";

function ForgotPassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    current_password: "",
    password: "",
  });

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useForgotPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#18181B] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center items-center gap-2 mb-8">
          <h1 className="text-2xl font-extrabold">
            <span className="text-white">Movie</span>
            <span className="text-[#8B5CF6]">Mela</span>
          </h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Change Password
          </h2>
          <p className="text-gray-400 text-sm">
            Enter your email, current password and new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full bg-[#09090B] border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#8B5CF6] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                placeholder="Enter current password"
                required
                className="w-full bg-[#09090B] border border-white/10 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-500 outline-none focus:border-[#8B5CF6] transition"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B5CF6]"
              >
                {showCurrentPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                className="w-full bg-[#09090B] border border-white/10 rounded-lg pl-11 pr-12 py-3 text-white placeholder-gray-500 outline-none focus:border-[#8B5CF6] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8B5CF6]"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg shadow-purple-500/20"
          >
            {isPending ? "Changing Password..." : "Change Password"}
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-400 text-sm text-center mt-4">
            {data?.message || "Password changed successfully!"}
          </p>
        )}

        {isError && (
          <p className="text-red-400 text-sm text-center mt-4">
            {error?.message || "Password change failed. Please try again."}
          </p>
        )}

        <div className="text-center mt-7">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-purple-400 font-semibold text-sm transition"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
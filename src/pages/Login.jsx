import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/authHooks";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        navigate("/home");
      },
    });
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
            Welcome Back!
          </h2>
          <p className="text-gray-400 text-sm">
            Login to continue exploring your favorite movies.
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
              Password
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
                placeholder="Enter your password"
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

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[#8B5CF6] hover:text-purple-400 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg shadow-purple-500/20"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {isError && (
          <p className="text-red-400 text-sm text-center mt-4">
            {error?.message || "Login failed. Please try again."}
          </p>
        )}

        <p className="text-center text-gray-400 text-sm mt-7">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-[#8B5CF6] hover:text-purple-400 font-semibold transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../features/auth/authHooks";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useRegister();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        navigate("/login");
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
            Create Account
          </h2>
          <p className="text-gray-400 text-sm">
            Join MOVIEmela and explore unlimited entertainment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#8B5CF6] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#8B5CF6] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full bg-[#09090B] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none focus:border-[#8B5CF6] transition"
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
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg shadow-purple-500/20"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-400 text-sm text-center mt-4">
            {data?.message || "Account created successfully!"}
          </p>
        )}

        {isError && (
          <p className="text-red-400 text-sm text-center mt-4">
            {error?.message || "Signup failed."}
          </p>
        )}

        <p className="text-center text-gray-400 text-sm mt-7">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#8B5CF6] hover:text-purple-400 font-semibold transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
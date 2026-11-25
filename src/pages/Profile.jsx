import React, { useEffect, useState } from "react";
import { User, Camera, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useProfile,
  useUpdateProfile,
} from "../features/auth/authHooks";
import { BASE_URL } from "../services/apiClient";

function getImageUrl(imagePath) {
  if (!imagePath) return null;

  if (
    imagePath.startsWith("http") ||
    imagePath.startsWith("blob:")
  ) {
    return imagePath;
  }

  return `${BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

function Profile() {
  const navigate = useNavigate();

  const reduxToken = useSelector(
    (state) => state.auth?.accessToken
  );

  const accessToken =
    reduxToken || localStorage.getItem("access_token");

  const {
    data,
    isLoading,
    isError: isProfileError,
    error: profileError,
  } = useProfile(accessToken);

  const {
    mutate,
    isPending,
    isError: isUpdateError,
    error: updateError,
    isSuccess,
    reset,
  } = useUpdateProfile();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!data) return;

    const profile = data.profile || data.user || data;

    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      image: null,
    });

    setPreview(getImageUrl(profile.image));
  }, [data]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    reset();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate("/login");
      return;
    }

    mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      imageFile: formData.image,
      accessToken,
    });
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="mb-4">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 px-5 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your personal information
          </p>
        </div>

        {isProfileError && (
          <p className="text-amber-400 text-sm mb-4">
            {profileError?.message ||
              "Profile load nahi ho saki."}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#18181B] border border-gray-800 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-[#27272A] border border-gray-700 overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={45}
                    className="text-gray-400"
                  />
                )}
              </div>

              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 p-2 rounded-full cursor-pointer transition"
              >
                <Camera size={18} />
              </label>

              <input
                type="file"
                id="profileImage"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <p className="text-gray-400 text-sm mt-3">
              Upload profile picture
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full bg-[#09090B] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-[#09090B] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full bg-[#09090B] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm text-gray-300 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="w-full bg-[#09090B] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500 transition"
            />
          </div>

          {isUpdateError && (
            <p className="text-red-400 text-sm text-center mb-4">
              {updateError?.message ||
                "Profile update failed"}
            </p>
          )}

          {isSuccess && (
            <p className="text-green-400 text-sm text-center mb-4">
              Profile updated successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition"
          >
            <Save size={18} />
            {isPending ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

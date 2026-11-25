import React from "react";
import { Search, UserRound, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar({ searchValue = "", onSearchChange, onQuickFilter }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { name: "Home", path: "/home", filter: null },
    { name: "Trending", path: "/home", filter: { rating: "7" } },
    { name: "Movies", path: "/home", filter: null },
    { name: "Series", path: "/home", filter: null },
    { name: "4K", path: "/home", filter: { quality: "2160p" } },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleNavClick = (link) => {
    navigate(link.path);
    if (link.filter && onQuickFilter) {
      onQuickFilter(link.filter);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#09090B] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-5">
        <div
          onClick={() => navigate("/home")}
          className="text-2xl font-extrabold tracking-tight whitespace-nowrap cursor-pointer"
        >
          <span className="text-white">Movie</span>
          <span className="text-[#8B5CF6]">Mela</span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => handleNavClick(link)}
              className="text-gray-400 hover:text-[#8B5CF6] transition font-medium cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-[#18181B] border border-white/10 rounded-full px-4 py-2.5 w-full sm:w-64 focus-within:border-[#8B5CF6] transition">
          <Search size={18} className="text-gray-400 shrink-0" />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search movies..."
            className="bg-transparent outline-none border-none text-white placeholder-gray-500 ml-3 w-full text-sm"
          />

          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              aria-label="Clear search"
              className="text-gray-400 hover:text-white ml-2 cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            title="Profile"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#18181B] border border-white/10 text-gray-400 hover:text-white hover:border-[#8B5CF6] transition cursor-pointer"
          >
            <UserRound size={20} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#18181B] border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition cursor-pointer"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
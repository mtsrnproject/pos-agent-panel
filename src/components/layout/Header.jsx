// src/components/layout/Header.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(authService.getStoredUser());

  useEffect(() => {
    if (!user) {
      authService.getSessionUser().then((u) => {
        if (u) setUser(u);
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (err) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="font-semibold text-slate-700 text-lg">
          سامانه مدیریت پایانه‌های فروش
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium">{user.split("@")[0]}</span>

            <span className="text-xs text-gray-500">{user}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
        >
          خروج
        </button>
      </div>
    </header>
  );
};

export default Header;

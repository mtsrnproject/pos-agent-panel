// src/components/layout/Header.jsx

import { useState, useEffect } from "react";
import authService from "../../services/authService";

const Header = () => {
  const [user, setUser] = useState(authService.getStoredUser());

  useEffect(() => {
    if (!user) {
      authService.getSessionUser().then((u) => {
        if (u) setUser(u);
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-12">

      <h1 className="font-semibold text-slate-700 text-lg">
        سامانه مدیریت پایانه‌های فروش
      </h1>

      {user && (
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm font-medium text-slate-700">
            {user.split("@")[0]}
          </span>

          <span className="text-xs text-gray-500">
            {user}
          </span>
        </div>
      )}

    </header>
  );
};

export default Header;
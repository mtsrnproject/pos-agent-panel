import { useState } from "react";

export default function AppHeader() {
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex flex-row-reverse justify-between items-center w-full px-gutter h-16 bg-surface-container-low shadow-sm backdrop-blur-md border-b border-outline-variant">
      {/* Left Section */}
      <div className="flex items-center gap-unit-4">
        <h1 className="text-title-lg font-title-lg font-bold text-primary hidden sm:block">
          سامانه مدیریت پایانه‌های فروش
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex flex-row-reverse items-center gap-unit-4">
        {/* Search */}
        <div className="relative hidden md:flex">
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-on-surface-variant">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="جستجو فاکتور یا دستگاه..."
            className="bg-surface border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary rounded-full px-10 py-2 text-body-md w-80 transition-all"
          />
        </div>

        {/* Notification */}
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors relative text-on-surface-variant">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 left-2 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="h-10 w-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface-container">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}

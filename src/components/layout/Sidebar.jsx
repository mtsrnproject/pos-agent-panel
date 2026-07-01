// src/components/layout/Sidebar.jsx

import { useLocation, useNavigate } from "react-router-dom";

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const DevicesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M17 1H7C5.9 1 5 1.9 5 3v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-5-1a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

const InvoiceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm0 2.5L17.5 8H14V4.5zM8 13h8v2H8v-2zm0-4h8v2H8V9zm0 8h5v2H8v-2z" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5z" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const menus = [
  {
    title: "داشبورد",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "دستگاه‌ها",
    path: "/devices",
    icon: <DevicesIcon />,
  },
  {
    title: "فاکتورها",
    path: "/invoices",
    icon: <InvoiceIcon />,
  },
  {
    title: "پروفایل",
    path: "/profile",
    icon: <ProfileIcon />,
  },
];

const Sidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
    bg-white border-l border-slate-200 shadow-md
    transition-all duration-300
    flex flex-col
    overflow-hidden
    ${isOpen ? "w-[280px]" : "w-0"}
  `}
      >
        {/* Close */}

        <button
          onClick={onToggle}
          className="absolute left-4 top-4 w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
        >
          <CloseIcon />
        </button>

        {/* Logo */}

        <div className="border-b p-6 flex flex-col items-center">
          <img
            src="/images/hoober.png"
            className="w-24 h-24 object-contain"
            alt=""
          />

          <h2 className="mt-3 text-lg font-bold text-slate-700">
            مدیریت نمایندگان
          </h2>

          <p className="text-xs text-slate-400 mt-1">Hoober POS Panel</p>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-2">
          {menus.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);

                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`
                  w-full
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  ${
                    active
                      ? "bg-primary/10 text-primary border-r-4 border-primary"
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                  }
                `}
              >
                {item.icon}

                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}

        <div className="border-t p-4">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50"
          >
            <LogoutIcon />

            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

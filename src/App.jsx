import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import { MainLayout } from "./components/layout";
import Invoices from "./pages/Invoices/index";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <div className="flex flex-row-reverse min-h-screen bg-slate-50">
              <Sidebar />
              <div
                className="flex-grow flex flex-col min-w-0"
                style={{ marginRight: "240px" }}
              >
                <MainLayout />
              </div>
            </div>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

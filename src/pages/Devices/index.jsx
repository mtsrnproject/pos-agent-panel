import React, { useState, useEffect } from "react";
import { deviceService } from "./../../services/deviceService";
import AssignDeviceModal from "../../components/shared/AssignDeviceModal";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // وضعیت دیالوگ تخصیص
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [assignLoading, setAssignLoading] = useState(false);

  const fetchDevices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await deviceService.getDevices(
        page,
        itemsPerPage,
        searchTerm,
      );
      setDevices(response.data || []);
      const total = response.total || 0;
      const dataLen = (response.data || []).length;
      const estimatedTotal =
        total > 0
          ? total
          : dataLen === itemsPerPage
            ? page * itemsPerPage + 1
            : (page - 1) * itemsPerPage + dataLen;
      setTotalPages(Math.ceil(estimatedTotal / itemsPerPage));
    } catch (err) {
      setError("خطا در دریافت اطلاعات دستگاه‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [page, searchTerm]);

  // تغییر صفحه
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // جستجو
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  // باز کردن دیالوگ تخصیص
  const handleOpenAssignDialog = (device) => {
    setSelectedDevice(device);
    setAssignDialogOpen(true);
  };

  // بستن دیالوگ تخصیص
  const handleCloseAssignDialog = () => {
    setAssignDialogOpen(false);
    setSelectedDevice(null);
  };

  // تخصیص دستگاه
  const handleAssignDevice = async (deviceName, { nationalId, mobile }) => {
    setAssignLoading(true);
    try {
      await deviceService.assignDevice(deviceName, nationalId, mobile);
      setAssignDialogOpen(false);
      setSelectedDevice(null);
      fetchDevices();
    } catch (err) {
      alert("خطا در تخصیص دستگاه");
    } finally {
      setAssignLoading(false);
    }
  };

  // رنگ وضعیت
  const getStatusColor = (status) => {
    const colors = {
      "فاکتور شده": "warning",
      "تخصیص داده شده": "success",
      غیرفعال: "error",
      فعال: "info",
    };
    return colors[status] || "default";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">مدیریت دستگاه‌ها</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            مشاهده و تخصیص پایانه‌های فروش
          </p>
        </div>
        <div className="relative">
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
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
          <input
            type="text"
            placeholder="جستجو بر اساس سریال..."
            value={searchTerm}
            onChange={handleSearch}
            className="pr-9 pl-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm placeholder-slate-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-72 transition-all"
          />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  مدل
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  شماره سریال
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  وضعیت
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  نام نماینده
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  آیدی نماینده
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  شماره پایانه
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <div className="inline-block w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : devices.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-400 text-sm"
                  >
                    دستگاهی یافت نشد
                  </td>
                </tr>
              ) : (
                devices.map((device) => (
                  <tr
                    key={device.name}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3 text-sm text-slate-700 font-medium">
                      {device.device_model || (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-sm font-mono text-slate-600">
                      {device.serial_number || (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          device.status === "فاکتور شده"
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                            : device.status === "تخصیص داده شده"
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : device.status === "غیرفعال"
                                ? "bg-red-50 text-red-600 ring-1 ring-red-200"
                                : "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                        }`}
                      >
                        {device.status || "نامشخص"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700">
                      {device.agent_name || (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs font-mono text-slate-500">
                      {device.owner || (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700">
                      {device.terminal || (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {device.status === "فاکتور شده" && (
                        <button
                          onClick={() => handleOpenAssignDialog(device)}
                          className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold bg-blue-700 transition-colors shadow-sm shadow-primary/20"
                        >
                          تخصیص
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {(totalPages > 1 || devices.length === itemsPerPage) && (
          <div className="flex justify-center items-center px-5 py-3.5 border-t border-slate-100 bg-white gap-1">
            <button
              onClick={() => handlePageChange(null, 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              «
            </button>
            <button
              onClick={() => handlePageChange(null, page - 1)}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ‹
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) =>
                  (p === 1 ||
                    p === totalPages ||
                    (p >= page - 1 && p <= page + 1)) && (
                    <button
                      key={p}
                      onClick={() => handlePageChange(null, p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ),
              )}
            </div>
            <button
              onClick={() => handlePageChange(null, page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ›
            </button>
            <button
              onClick={() => handlePageChange(null, totalPages)}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              »
            </button>
          </div>
        )}
      </div>

      {/* Assign Device Modal - Shared Component */}
      <AssignDeviceModal
        open={assignDialogOpen}
        device={selectedDevice}
        onClose={handleCloseAssignDialog}
        onSubmit={handleAssignDevice}
        loading={assignLoading}
      />
    </div>
  );
};

export default Devices;

import { useState, useEffect } from "react";
import invoiceService from "../../services/invoiceService";
import { deviceService } from "../../services/deviceService";
import authService from "../../services/authService";

const StatCard = ({ title, value, color, icon, loading }) => (
  <div className={`${color} rounded-2xl p-5 shadow-sm flex items-center gap-4`}>
    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-white/70 font-medium">{title}</p>
      {loading ? (
        <div className="animate-pulse w-12 h-8 bg-white/30 rounded mt-1"></div>
      ) : (
        <p className="text-3xl font-bold text-white leading-none mt-1">
          {value}
        </p>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = authService.getStoredUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [invRes, devRes] = await Promise.all([
          invoiceService.getInvoices({ pageSize: 500 }),
          deviceService.getDevices(1, 500),
        ]);
        setInvoices(invRes.data || []);
        setDevices(devRes.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const assignedDevices = devices.filter((d) => d.status === "تخصیص داده شده");
  const invoicedDevices = devices.filter((d) => d.status === "فاکتور شده");

  const recentInvoices = invoices.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">داشبورد</h1>
        {user && <p className="text-sm text-slate-400 mt-0.5">کاربر: {user}</p>}
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="کل فاکتورها"
          value={invoices.length}
          color="bg-gradient-to-br from-blue-600 to-blue-700"
          icon="🧾"
          loading={loading}
        />
        <StatCard
          title="کل دستگاه‌ها"
          value={devices.length}
          color="bg-gradient-to-br from-violet-600 to-violet-700"
          icon="📱"
          loading={loading}
        />
        <StatCard
          title="تخصیص داده شده"
          value={assignedDevices.length}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          icon="✓"
          loading={loading}
        />
        <StatCard
          title="فاکتور شده"
          value={invoicedDevices.length}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          icon="📄"
          loading={loading}
        />
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-700">
            آخرین فاکتورها
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : recentInvoices.length === 0 ? (
          <p className="text-center py-10 text-slate-400 text-sm">
            فاکتوری یافت نشد
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    شماره فاکتور
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    نام مشتری
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    کد ملی
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    موبایل
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    تعداد دستگاه
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    تاریخ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentInvoices.map((inv) => (
                  <tr
                    key={inv.name}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-3 text-sm font-bold text-primary">
                      #{inv.invoice_number}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700">
                      {inv.first_name} {inv.last_name}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500 font-mono">
                      {inv.national_id || "—"}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500 font-mono">
                      {inv.mobile || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {inv.devices_count ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-500">
                      {inv.invoice_date_jalali || inv.invoice_date || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// src/components/invoices/InvoiceDetailsPanel.jsx
export default function InvoiceDetailsPanel({
  invoice,
  devices,
  loading,
  onAssign,
}) {
  if (!invoice)
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-48">
        <div className="text-center text-slate-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto mb-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
          </svg>
          <p className="text-sm">یک فاکتور را انتخاب کنید</p>
        </div>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Invoice Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            فاکتور{" "}
            <span className="text-primary">#{invoice.invoice_number}</span>
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {invoice.first_name} {invoice.last_name}
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
          {devices.length} دستگاه
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : devices.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-10">
          دستگاهی برای این فاکتور یافت نشد
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">
                  سریال
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">
                  مدل
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">
                  وضعیت
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">
                  مالک
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {devices.map((d) => (
                <tr
                  key={d.name}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono text-slate-600">
                    {d.serial_number}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {d.device_model}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        d.status === "تخصیص داده شده"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : d.status === "فاکتور شده"
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {d.status || "نامشخص"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {d.first_name && d.last_name ? (
                      `${d.first_name} ${d.last_name}`
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {d.status === "فاکتور شده" ? (
                      <button
                        onClick={() => onAssign(d)}
                        className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-colors shadow-sm shadow-amber-200"
                      >
                        تخصیص
                      </button>
                    ) : (
                      <span className="text-xs text-slate-300">
                        {d.status === "تخصیص داده شده" ? "✓ تخصیص شده" : "—"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// src/pages/Invoices/index.jsx
import { useState, useEffect } from "react";
import invoiceService from "../../services/invoiceService";
import AssignDeviceModal from "../../components/shared/AssignDeviceModal";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setLoadingList(true);
    try {
      const response = await invoiceService.getInvoices();
      const invoiceList = response.data || response || [];
      setInvoices(invoiceList);
      if (invoiceList.length > 0) {
        await selectInvoice(invoiceList[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  };

  const selectInvoice = async (invoice) => {
    setSelectedInvoice(invoice);
    setDevices([]);
    setLoadingDevices(true);
    try {
      const result = await invoiceService.getDevicesByInvoice(
        invoice.invoice_number,
      );
      setDevices(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDevices(false);
    }
  };

  const handleAssignSubmit = async (deviceName, { nationalId, mobile }) => {
    setLoadingAssign(true);
    try {
      await invoiceService.assignDevice(deviceName, { nationalId, mobile });
      setModalOpen(false);
      if (selectedInvoice) {
        const list = await invoiceService.getDevicesByInvoice(
          selectedInvoice.invoice_number,
        );
        setDevices(list);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAssign(false);
    }
  };

  return (
    <div className="flex gap-5 h-[calc(100vh-112px)]">
      {/* Sidebar - Invoice List */}
      <div className="w-64 flex-shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex-shrink-0">
          <h2 className="text-sm font-semibold text-slate-600">
            فاکتورها
            {invoices.length > 0 && (
              <span className="text-slate-400 font-normal mr-1">
                ({invoices.length})
              </span>
            )}
          </h2>
        </div>

        <div className="overflow-y-auto flex-1">
          {loadingList ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : invoices.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              فاکتوری یافت نشد
            </p>
          ) : (
            invoices.map((inv) => {
              const active = selectedInvoice?.name === inv.name;
              return (
                <button
                  key={inv.name}
                  onClick={() => selectInvoice(inv)}
                  className={`w-full text-right px-4 py-3 border-r-2 transition-all ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${active ? "text-primary" : "text-slate-700"}`}
                  >
                    #{inv.invoice_number}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {inv.first_name} {inv.last_name}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {inv.devices_count} دستگاه
                  </p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main - Device Table */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {selectedInvoice ? (
                <>
                  فاکتور{" "}
                  <span className="text-primary">
                    #{selectedInvoice.invoice_number}
                  </span>
                </>
              ) : (
                "مدیریت فاکتورها"
              )}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {selectedInvoice
                ? `${selectedInvoice.first_name} ${selectedInvoice.last_name} — ${devices.length} دستگاه`
                : "یک فاکتور را از لیست انتخاب کنید"}
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex-1 flex flex-col">
          {!selectedInvoice ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-slate-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14 mx-auto mb-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                </svg>
                <p className="text-sm">یک فاکتور انتخاب کنید</p>
              </div>
            </div>
          ) : (
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead className="sticky top-0">
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      شماره سریال
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      مدل
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      وضعیت
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      شماره پایانه
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wide w-24">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loadingDevices ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <div className="inline-block w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                      </td>
                    </tr>
                  ) : devices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-slate-400 text-sm"
                      >
                        دستگاهی برای این فاکتور یافت نشد
                      </td>
                    </tr>
                  ) : (
                    devices.map((device) => (
                      <tr
                        key={device.name}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm font-mono text-slate-600">
                          {device.serial_number || (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {device.device_model || (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                              device.status === "فاکتور شده"
                                ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                                : device.status === "تخصیص داده شده"
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                  : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {device.status || "نامشخص"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {device.terminal || (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-center w-24">
                          {device.status === "فاکتور شده" ? (
                            <button
                              onClick={() => {
                                setSelectedDevice(device);
                                setModalOpen(true);
                              }}
                              className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-semibold bg-blue-700 transition-colors"
                            >
                              تخصیص
                            </button>
                          ) : device.status === "تخصیص داده شده" ? (
                            <span className="text-xs text-emerald-500 font-medium">
                              ✓
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AssignDeviceModal
        open={modalOpen}
        device={selectedDevice}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAssignSubmit}
        loading={loadingAssign}
      />
    </div>
  );
}

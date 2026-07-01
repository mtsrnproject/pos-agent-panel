// src/components/invoices/InvoiceCard.jsx
export default function InvoiceCard({ invoice, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer transition-all border-r-2 ${
        isSelected
          ? "border-primary bg-primary/5"
          : "border-transparent hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-sm font-bold ${isSelected ? "text-primary" : "text-slate-800"}`}
        >
          #{invoice.invoice_number}
        </span>
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-full">
          فاکتور
        </span>
      </div>
      <p className="text-sm text-slate-600 truncate mb-1">
        {invoice.first_name} {invoice.last_name}
      </p>
      <p className="text-xs text-slate-400">{invoice.devices_count} دستگاه</p>
    </div>
  );
}

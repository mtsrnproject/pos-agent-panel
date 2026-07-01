// src/components/invoices/InvoiceList.jsx
import InvoiceCard from "./InvoiceCard";

export default function InvoiceList({
  invoices,
  selectedId,
  onSelect,
  loading,
}) {
  if (loading)
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-600">
          فاکتورها{" "}
          <span className="text-slate-400 font-normal">
            ({invoices.length})
          </span>
        </h2>
      </div>

      <div className="divide-y divide-slate-50 overflow-y-auto max-h-[calc(100vh-200px)]">
        {invoices.map((inv) => (
          <InvoiceCard
            key={inv.name}
            invoice={inv}
            isSelected={inv.name === selectedId}
            onClick={() => onSelect(inv)}
          />
        ))}
      </div>
    </div>
  );
}

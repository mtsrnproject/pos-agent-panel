import api from "./api";

export const invoiceService = {
  // دریافت لیست فاکتورها
  getInvoices: async () => {
    return await api.get("/invoices");
  },

  // دریافت جزئیات یک فاکتور
  getInvoiceById: async (id) => {
    return await api.get(`/invoices/${id}`);
  },

  // ثبت فاکتور جدید
  createInvoice: async (data) => {
    return await api.post("/invoices", data);
  },

  // تخصیص دستگاه
  assignDevice: async (serial, data) => {
    return await api.post(`/devices/${serial}/assign`, data);
  },
};

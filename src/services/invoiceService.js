import api from "./api";

const DOCTYPE = "Invoice"; // نام Doctype فاکتور در Frappe

const INVOICE_FIELDS = JSON.stringify([
  "name",
  "invoice_number",
  "invoice_date",
  "invoice_date_jalali",
  "invoice_date_gregorian",
  "first_name",
  "last_name",
  "national_id",
  "mobile",
  "device_type",
  "devices_count",
  "device_without_cash_les",
  "agent",
  "owner",
  "creation",
  "modified",
  "docstatus",
  "submit_reject_reson",
]);

const invoiceService = {
  /**
   * دریافت لیست فاکتورهای کاربر جاری
   */
  getInvoices: async (params = {}) => {
    const { page = 1, pageSize = 50 } = params;

    try {
      const url =
        `/api/resource/${DOCTYPE}` +
        `?fields=${encodeURIComponent(INVOICE_FIELDS)}` +
        `&limit_page_length=${pageSize}` +
        `&limit_start=${(page - 1) * pageSize}` +
        `&order_by=creation desc`;

      const data = await api.get(url);
      const invoiceList = Array.isArray(data) ? data : data?.data || [];

      return {
        data: invoiceList,
        total: invoiceList.length,
      };
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  },

  /**
   * دریافت جزئیات یک فاکتور
   */
  getInvoice: async (invoiceId) => {
    try {
      const data = await api.get(`/api/resource/${DOCTYPE}/${invoiceId}`);
      return Array.isArray(data) ? data[0] : data?.data || data;
    } catch (error) {
      console.error(`Error fetching invoice ${invoiceId}:`, error);
      throw error;
    }
  },

  /**
   * ایجاد فاکتور جدید
   */
  createInvoice: async (invoiceData) => {
    try {
      const data = await api.post(`/api/resource/${DOCTYPE}`, invoiceData);
      return Array.isArray(data) ? data[0] : data?.data || data;
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  },

  /**
   * به‌روزرسانی فاکتور
   */
  updateInvoice: async (invoiceId, updates) => {
    try {
      const data = await api.put(
        `/api/resource/${DOCTYPE}/${invoiceId}`,
        updates,
      );
      return Array.isArray(data) ? data[0] : data?.data || data;
    } catch (error) {
      console.error(`Error updating invoice ${invoiceId}:`, error);
      throw error;
    }
  },

  /**
   * حذف فاکتور
   */
  deleteInvoice: async (invoiceId) => {
    try {
      const data = await api.delete(`/api/resource/${DOCTYPE}/${invoiceId}`);
      return data;
    } catch (error) {
      console.error(`Error deleting invoice ${invoiceId}:`, error);
      throw error;
    }
  },

  /**
   * دریافت آمار فاکتورها برای داشبورد
   */
  getInvoiceStats: async () => {
    try {
      const statuses = ["Pending", "Assigned", "Completed", "Cancelled"];

      const requests = statuses.map((status) =>
        api.get(
          `/api/resource/${DOCTYPE}?filters=${encodeURIComponent(JSON.stringify([["status", "=", status]]))}&limit_page_length=1`,
        ),
      );

      const responses = await Promise.all(requests);

      return statuses.reduce((acc, status, index) => {
        const data = responses[index];
        const count = Array.isArray(data)
          ? data.length
          : data?.data?.length || 0;
        acc[status.toLowerCase()] = count;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error fetching invoice stats:", error);
      throw error;
    }
  },

  /**
   * دریافت دستگاه‌های یک فاکتور بر اساس invoice_number
   */
  getDevicesByInvoice: async (invoiceNumber) => {
    try {
      const filters = JSON.stringify([
        ["invoice_number", "=", String(invoiceNumber)],
      ]);
      const fields = JSON.stringify([
        "name",
        "serial_number",
        "device_model",
        "device_brand",
        "device_label",
        "product",
        "status",
        "terminal",
        "bank_switch",
        "first_name",
        "last_name",
        "national_id",
        "national__id",
        "mobile",
        "invoice",
        "invoice_number",
        "agent_name",
        "seller_agent",
        "owner",
        "creation",
      ]);

      const url =
        `/api/resource/Device` +
        `?fields=${encodeURIComponent(fields)}` +
        `&filters=${encodeURIComponent(filters)}` +
        `&limit_page_length=100`;

      const data = await api.get(url);
      return Array.isArray(data) ? data : data?.data || [];
    } catch (error) {
      console.error(
        `Error fetching devices for invoice ${invoiceNumber}:`,
        error,
      );
      throw error;
    }
  },

  /**
   * تخصیص دستگاه به فاکتور
   */
  assignDevice: async (deviceName, { nationalId, mobile }) => {
    try {
      const data = await api.put(`/api/resource/Device/${deviceName}`, {
        national__id: nationalId,
        mobile: mobile,
        status: "تخصیص داده شده",
      });
      return Array.isArray(data) ? data[0] : data?.data || data;
    } catch (error) {
      console.error(`Error assigning device ${deviceName}:`, error);
      throw error;
    }
  },
};

export default invoiceService;

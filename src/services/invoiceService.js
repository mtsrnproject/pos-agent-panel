import api from "./api";

const DOCTYPE = "Invoice"; // نام Doctype فاکتور در Frappe

const invoiceService = {
  /**
   * دریافت لیست فاکتورها با فیلتر و صفحه‌بندی
   */
  getInvoices: async (params = {}) => {
    const {
      status,
      search,
      page = 1,
      pageSize = 20,
      sortBy = "creation",
      sortOrder = "desc",
    } = params;

    try {
      // ابتدا یک درخواست ساده بدون فیلترهای پیچیده
      const data = await api.get(
        `/api/resource/Invoice?limit_page_length=${pageSize}&limit_start=${(page - 1) * pageSize}`,
      );
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
   * دریافت دستگاه‌های یک فاکتور
   */
  getDevicesByInvoice: async (invoiceName) => {
    try {
      const filters = JSON.stringify([["invoice", "=", invoiceName]]);
      const params = new URLSearchParams({
        filters,
        fields: JSON.stringify([
          "name",
          "serial_number",
          "device_model",
          "device_brand",
          "status",
          "national_id",
          "mobile",
          "creation",
        ]),
      });

      const data = await api.get(`/api/resource/Device?${params.toString()}`);
      const deviceList = Array.isArray(data) ? data : data?.data || [];
      return deviceList;
    } catch (error) {
      console.error(
        `Error fetching devices for invoice ${invoiceName}:`,
        error,
      );
      throw error;
    }
  },

  /**
   * تخصیص دستگاه به فاکتور
   */
  assignDevice: async (deviceName, formData) => {
    try {
      const data = await api.put(`/api/resource/Device/${deviceName}`, {
        national__id: formData.nationalId,
        mobile: formData.mobile,
        first_name: formData.firstName,
        last_name: formData.lastName,
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

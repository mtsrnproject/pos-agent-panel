import api from "./api";

const DOCTYPE = "Device";

const FIELDS = JSON.stringify([
  "name",
  "serial_number",
  "device_model",
  "device_brand",
  "device_label",
  "product",
  "status",
  "terminal",
  "bank_switch",
  "sim_card_no",
  "sim_card_serial",
  "bank_terminal",
  "first_name",
  "last_name",
  "national__id",
  "national_id",
  "mobile",
  "invoice",
  "invoice_date",
  "invoice_number",
  "agent_name",
  "seller_agent",
  "registration_number",
  "documents_validation_status",
  "cash_less",
  "submit_reject_reson",
  "owner",
  "creation",
  "modified",
]);

export const deviceService = {
  async getDevices(page = 1, limit = 10, search = "") {
    const filterConditions = [];

    if (search) {
      filterConditions.push(["serial_number", "like", `%${search}%`]);
    }

    const filtersParam =
      filterConditions.length > 0
        ? encodeURIComponent(JSON.stringify(filterConditions))
        : encodeURIComponent("[]");

    const dataUrl =
      `/api/resource/${DOCTYPE}` +
      `?fields=${encodeURIComponent(FIELDS)}` +
      `&filters=${filtersParam}` +
      `&limit_page_length=${limit}` +
      `&limit_start=${(page - 1) * limit}` +
      `&order_by=creation desc`;

    const countUrl =
      `/api/resource/${DOCTYPE}` +
      `?fields=${encodeURIComponent('["name"]')}` +
      `&filters=${filtersParam}` +
      `&limit_page_length=0`;

    const [response, countResponse] = await Promise.all([
      api.get(dataUrl),
      api.get(countUrl),
    ]);

    const total = Array.isArray(countResponse?.data)
      ? countResponse.data.length
      : 0;

    return {
      data: response?.data || [],
      total,
    };
  },

  async getDevice(name) {
    const response = await api.get(`/api/resource/${DOCTYPE}/${name}`);

    return response.data;
  },

  async assignDevice(name, nationalId, mobile) {
    const response = await api.put(`/api/resource/${DOCTYPE}/${name}`, {
      national__id: nationalId,
      mobile: mobile,
      status: "تخصیص داده شده",
    });

    return response.data;
  },
};

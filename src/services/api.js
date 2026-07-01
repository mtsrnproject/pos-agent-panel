import axios from "axios";

// در development درخواست‌ها از طریق Vite proxy می‌رن (localhost → plus.hamtabank.com)
// در production (روی همون دامنه) مستقیم کار می‌کنه
const api = axios.create({
  baseURL: import.meta.env.PROD ? "https://plus.hamtabank.com" : "",
  timeout: 15000,
  withCredentials: true, // ارسال کوکی session با هر درخواست
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    console.error("API ERROR:", error.response?.status, error.response?.data);

    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;

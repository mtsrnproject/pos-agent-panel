import axios from "axios";

const api = axios.create({
  baseURL: "https://plus.hamtabank.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "token db5ceba5939cfec:ac699dba08a7a7a",
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

import api from "./api";
import { getCookieValue, getCurrentUserId } from "../utils/cookieUtils";

const authService = {
  /**
   * ورود به سیستم
   */
  login: async (username, password) => {
    try {
      const response = await api.post("/api/method/login", {
        usr: username,
        pwd: password,
      });

      if (response.message === "Logged In") {
        // کوکی user_id که سرور بعد از لاگین تنظیم می‌کنه
        // ایمیل واقعی کاربر است (مثلاً: 0020819447plus_@hamtabank.com)
        const cookieUser = getCookieValue("user_id");
        const userEmail =
          cookieUser && cookieUser !== "Guest" ? cookieUser : username;

        localStorage.setItem("user", JSON.stringify(userEmail));
        localStorage.setItem("isLoggedIn", "true");
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * دریافت کاربر فعلی
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get("/api/method/frappe.auth.get_logged_user");
      return response.message;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  },

  /**
   * خروج از سیستم
   */
  logout: async () => {
    try {
      const response = await api.post("/api/method/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("authToken");
      return response;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  /**
   * بررسی وضعیت ورود — localStorage یا کوکی session
   */
  isLoggedIn: () => {
    if (localStorage.getItem("isLoggedIn") === "true") return true;
    // اگر کوکی user_id موجود و معتبر باشد، کاربر لاگین است
    const cookieUser = getCookieValue("user_id");
    return !!(cookieUser && cookieUser !== "Guest");
  },

  /**
   * دریافت اطلاعات کاربر ذخیره شده (کوکی > localStorage)
   */
  getStoredUser: () => {
    // ابتدا از کوکی بخوان
    const cookieUser = getCurrentUserId();
    if (cookieUser) return cookieUser;
    // fallback به localStorage
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      // اگر شیء بود، email/name را استخراج کن
      if (parsed && typeof parsed === "object") {
        return parsed.name || parsed.email || parsed.full_name || null;
      }
      return parsed;
    } catch {
      return raw;
    }
  },
  /**
   * دریافت کاربر جاری از session Frappe
   */
  getSessionUser: async () => {
    try {
      const res = await api.get("/api/method/frappe.auth.get_logged_user");
      const user = res.message || res;
      if (user && user !== "Guest") {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
      return null;
    } catch {
      return null;
    }
  },
};

export default authService;

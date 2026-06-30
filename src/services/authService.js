import api from "./api";

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

      // ذخیره اطلاعات کاربر در localStorage
      if (response.message === "Logged In") {
        // دریافت اطلاعات کاربر فعلی
        const currentUser = await authService.getCurrentUser();
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("authToken", "authenticated");
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
   * بررسی وضعیت ورود
   */
  isLoggedIn: () => {
    return localStorage.getItem("isLoggedIn") === "true";
  },

  /**
   * دریافت اطلاعات کاربر ذخیره شده
   */
  getStoredUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;

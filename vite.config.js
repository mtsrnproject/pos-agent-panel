import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_TARGET = "https://plus.hamtabank.com";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: API_TARGET,
        changeOrigin: true,
        secure: true,
        // حذف SameSite و Secure از کوکی‌ها تا در localhost کار کنن
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const setCookie = proxyRes.headers["set-cookie"];
            if (setCookie) {
              proxyRes.headers["set-cookie"] = setCookie.map((c) =>
                c
                  .replace(/; SameSite=\w+/gi, "; SameSite=Lax")
                  .replace(/; Secure/gi, "")
                  .replace(/domain=plus\.hamtabank\.com/gi, "domain=localhost"),
              );
            }
          });
        },
      },
    },
  },
});

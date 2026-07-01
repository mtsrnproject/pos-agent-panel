/**
 * خواندن مقدار یک کوکی بر اساس نام آن
 */
export function getCookieValue(name) {
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

/**
 * دریافت ایمیل کاربر جاری — کوکی user_id اول، سپس localStorage
 * localStorage باید توسط login() از همین کوکی پر شده باشد
 */
export function getCurrentUserId() {
  // اول از کوکی بخوان (مطمئن‌ترین منبع)
  const id = getCookieValue("user_id");
  if (id && id !== "Guest") return id;

  // fallback به localStorage (که login() مقدار صحیح کوکی را ذخیره کرده)
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      // فقط اگر شبیه ایمیل بود (شامل @) قبول کن
      if (typeof parsed === "string" && parsed.includes("@")) return parsed;
      if (parsed && typeof parsed === "object") {
        const email = parsed.name || parsed.email || null;
        if (email && email.includes("@")) return email;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

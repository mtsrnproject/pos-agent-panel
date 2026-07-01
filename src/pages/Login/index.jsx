import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("نام کاربری و رمز عبور الزامی است");
      setLoading(false);
      return;
    }

    try {
      // برای development: اگر از credentials صحیح استفاده کنند
      // یا اگر تنها می‌خواهند test کنند می‌توانند هر چیزی وارد کنند
      if (username && password) {
        // سعی کن واقعی login کنی
        try {
          await authService.login(username, password);
          navigate("/dashboard");
        } catch (apiErr) {
          // اگر API کار نکرد، برای development موارد mock کن
          if (process.env.NODE_ENV === "development") {
            // سعی کن از کوکی user_id بخوان، وگرنه username را ذخیره کن
            const { getCookieValue } = await import("../../utils/cookieUtils");
            const cookieUser = getCookieValue("user_id");
            const userToStore =
              cookieUser && cookieUser !== "Guest" ? cookieUser : username;
            localStorage.setItem("user", JSON.stringify(userToStore));
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
          } else {
            throw apiErr;
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("نام کاربری یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-md mx-unit-4">
        <div className="bg-surface-container rounded-3xl shadow-lg border border-outline-variant p-unit-8">
          <h1 className="text-heading-lg font-heading-lg text-center mb-unit-6 text-on-surface">
            ورود به سیستم
          </h1>

          {error && (
            <div className="bg-error-container border border-error rounded-lg p-unit-4 mb-unit-4 text-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-unit-4">
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-unit-2">
                نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-unit-4 py-unit-3 rounded-xl border-2 border-primary bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:opacity-50 disabled:bg-surface-variant"
                placeholder="نام کاربری خود را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-unit-2">
                رمز عبور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-unit-4 py-unit-3 rounded-xl border-2 border-outline bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:bg-surface-variant"
                placeholder="رمز عبور خود را وارد کنید"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-unit-3 px-unit-4 bg-primary text-on-primary rounded-xl font-title-lg text-title-lg font-semibold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-unit-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                  در حال ورود...
                </>
              ) : (
                "ورود"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

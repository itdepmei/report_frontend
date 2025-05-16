import { useState } from "react";
import axios from "axios";
import baseURL from "../../Api/baseURL";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await baseURL.post("/api/v1/auth/forgotPassword/", { email });
      setSuccess("تم ارسال رمز التحقق الى البريد الالكتروني");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await baseURL.post("/api/v1/auth/verifyResetCode", { resetCode });
      setSuccess("تم التحقق من الرمز");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      await baseURL.put("/api/v1/auth/resetPassword", {
        email,
        newPassword,
      });
      setSuccess("تم تغيير كلمة المرور بنجاح");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      // Redirect to login or show success message
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl h-auto rounded-lg bg-white p-12 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 p-4">
            استعادة كلمة المرور
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {step === 1 && "أدخل بريدك الإلكتروني لاستلام رمز إعادة التعيين"}
            {step === 2 && "أدخل رمز التحقق المرسل إلى بريدك الإلكتروني"}
            {step === 3 && "أدخل كلمة المرور الجديدة"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-12 flex justify-between">
          <div
            className={`flex flex-col items-center ${
              step >= 1 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`h-12 w-12 rounded-full ${
                step >= 1
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gray-200"
              } flex items-center justify-center text-white text-xl font-bold`}
            >
              1
            </div>
            <span className="mt-3 text-base font-medium">البريد</span>
          </div>
          <div className="relative flex-1 mx-4">
            <div className="absolute top-6 h-1 w-full bg-gray-200">
              <div
                className={`h-1 bg-gradient-to-r from-blue-500 to-indigo-500 ${
                  step >= 2 ? "w-full" : "w-0"
                } transition-all duration-300`}
              ></div>
            </div>
          </div>
          <div
            className={`flex flex-col items-center ${
              step >= 2 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`h-12 w-12 rounded-full ${
                step >= 2
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gray-200"
              } flex items-center justify-center text-white text-xl font-bold`}
            >
              2
            </div>
            <span className="mt-3 text-base font-medium">التحقق</span>
          </div>
          <div className="relative flex-1 mx-4">
            <div className="absolute top-6 h-1 w-full bg-gray-200">
              <div
                className={`h-1 bg-gradient-to-r from-blue-500 to-indigo-500 ${
                  step >= 3 ? "w-full" : "w-0"
                } transition-all duration-300`}
              ></div>
            </div>
          </div>
          <div
            className={`flex flex-col items-center ${
              step >= 3 ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <div
              className={`h-12 w-12 rounded-full ${
                step >= 3 ? "bg-blue-600" : "bg-gray-200"
              } flex items-center justify-center text-white text-xl font-bold`}
            >
              3
            </div>
            <span className="mt-3 text-base font-medium">تعيين</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-lg text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-lg text-green-700">
            {success}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="email"
                className="block text-right text-lg font-medium text-gray-700"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-4 text-right text-xl"
                placeholder="أدخل بريدك الإلكتروني"
                required
                dir="rtl"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 py-4 text-white text-xl font-bold ${
                loading ? "opacity-70" : "hover:from-blue-600 hover:to-indigo-600"
              }`}
            >
              {loading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="resetCode"
                className="block text-right text-lg font-medium text-gray-700"
              >
                رمز التحقق
              </label>
              <input
                type="text"
                id="resetCode"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-4 text-right text-xl"
                placeholder="أدخل رمز التحقق"
                required
                dir="rtl"
              />
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 py-4 text-white text-xl font-bold ${
                  loading ? "opacity-70" : "hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                {loading ? "جاري التحقق..." : "تحقق من الرمز"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="newPassword"
                className="block text-right text-lg font-medium text-gray-700"
              >
                كلمة المرور الجديدة
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-4 text-right text-xl"
                placeholder="أدخل كلمة المرور الجديدة"
                required
                dir="rtl"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="confirmPassword"
                className="block text-right text-lg font-medium text-gray-700"
              >
                تأكيد كلمة المرور
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-4 text-right text-xl"
                placeholder="تأكيد كلمة المرور الجديدة"
                required
                dir="rtl"
              />
            </div>
            <div className="flex space-x-4 space-x-reverse">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 py-4 text-white text-xl font-bold ${
                  loading ? "opacity-70" : "hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                {loading ? "جاري التعيين..." : "تعيين كلمة المرور"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
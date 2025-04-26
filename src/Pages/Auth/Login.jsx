import React from "react";
import { FaUserAlt, FaLock, FaSignInAlt } from "react-icons/fa";
import urLogo from "../../assets/urlogo.png";
import LoginHook from "../../hook/auth/login-hook";

const Login = () => {
  const [
    email,
    password,
    loading,
    onChangEmail,
    onChangePassword,
    onSubmit,
  ] = LoginHook();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-2xl">
        <img
          src={urLogo}
          alt="logo"
          className="w-[130px] h-[130px] object-contain mx-auto"
        />
        <h2 className="text-3xl font-bold text-indigo-600 my-6 text-center">
          تسجيل الدخول
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2 text-lg text-right"
            >
              اسم المستخدم
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={onChangEmail}
                onKeyDown={handleKeyDown}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-lg text-left"
                dir="ltr"
                placeholder="اسم المستخدم"
              />
              <FaUserAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-lg text-right"
            >
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={onChangePassword}
                onKeyDown={handleKeyDown}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-lg text-left"
                dir="ltr"
                placeholder="********"
              />
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaSignInAlt className="text-2xl" />
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>

        <div className="text-gray-600 text-sm text-center mt-8">
          <p className="mt-2">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
            >
              هل نسيت كلمة المرور؟
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

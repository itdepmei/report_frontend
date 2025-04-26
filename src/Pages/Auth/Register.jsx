import React from "react";
import {
  FaUserAlt,
  FaLock,
  FaSignInAlt,
  FaEnvelope,
  FaPhone,
  FaIdCard,
} from "react-icons/fa";
import urLogo from "../../assets/urlogo.png";
import RegisterHook from "../../hook/auth/register-hook";

const Register = () => {
  const [
    role,
    name,
    email,
    phone,
    password,
    passwordConfirm,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeRole,
    OnSubmit,
  ] = RegisterHook();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  const inputClass =
    "w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition text-lg text-right";
  const labelClass = "block text-gray-700 font-medium mb-2 text-lg text-right";
  const iconContainerClass =
    "absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100";
  const iconClass = "text-indigo-600 text-lg";

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={urLogo}
            alt="logo"
            className="w-[100px] h-[100px] object-contain"
          />
          <div className="mr-4 text-center md:text-right">
            <h2 className="text-3xl font-bold text-indigo-600">تسجيل حساب جديد</h2>
            <p className="text-xl font-bold text-gray-500">
              منتجات اور
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* المعلومات الشخصية */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-indigo-600 mb-4 text-right border-r-4 border-indigo-500 pr-3">
              المعلومات الشخصية
            </h3>
          </div>

          {/* Name Field */}
          <div className="md:col-span-2">
            <label htmlFor="name" className={labelClass}>
              الاسم الكامل
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={onChangeName}
                onKeyDown={handleKeyDown}
                className={inputClass}
                dir="rtl"
                placeholder="الاسم الكامل"
              />
              <div className={iconContainerClass}>
                <FaUserAlt className={iconClass} />
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className={labelClass}>
              المنصب
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={onChangeRole}
                className={inputClass}
                dir="rtl"
              >
                <option value="user">مستخدم</option>
                <option value="admin">مسؤول</option>
              </select>
              <div className={iconContainerClass}>
                <FaIdCard className={iconClass} />
              </div>
            </div>
          </div>

          {/* معلومات الاتصال */}
          <div className="md:col-span-3 mt-4">
            <h3 className="text-xl font-bold text-indigo-600 mb-4 text-right border-r-4 border-indigo-500 pr-3">
              معلومات الاتصال
            </h3>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelClass}>
              البريد الالكتروني
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={onChangeEmail}
                onKeyDown={handleKeyDown}
                className={inputClass}
                dir="ltr"
                placeholder="البريد الالكتروني"
              />
              <div className={iconContainerClass}>
                <FaEnvelope className={iconClass} />
              </div>
            </div>
          </div>

          {/* Phone Field */}
          <div className="md:col-span-2">
            <label htmlFor="phone" className={labelClass}>
              رقم الجوال
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={onChangePhone}
                onKeyDown={handleKeyDown}
                className={inputClass}
                dir="ltr"
                placeholder="رقم الجوال"
              />
              <div className={iconContainerClass}>
                <FaPhone className={iconClass} />
              </div>
            </div>
          </div>

          {/* معلومات الحساب */}
          <div className="md:col-span-3 mt-4">
            <h3 className="text-xl font-bold text-indigo-600 mb-4 text-right border-r-4 border-indigo-500 pr-3">
              معلومات الحساب
            </h3>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelClass}>
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                onKeyDown={handleKeyDown}
                className={inputClass}
                dir="ltr"
                placeholder="********"
              />
              <div className={iconContainerClass}>
                <FaLock className={iconClass} />
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="md:col-span-2">
            <label htmlFor="confirmPassword" className={labelClass}>
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                value={passwordConfirm}
                onChange={onChangeConfirmPassword}
                onKeyDown={handleKeyDown}
                className={inputClass}
                dir="ltr"
                placeholder="********"
              />
              <div className={iconContainerClass}>
                <FaLock className={iconClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={OnSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition mt-6 flex items-center justify-center gap-2"
        >
          <FaSignInAlt className="text-xl" />
          تسجيل مستخدم
        </button>
      </div>
    </div>
  );
};

export default Register;

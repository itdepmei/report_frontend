import React, { useState } from "react";
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
import { Toaster } from "react-hot-toast";


const Register = ({open, close}) => {
  const [
    role,
    name,
    email,
    phone,
    password,
    passwordConfirm,
    department,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onChangeRole,
    onChangeDepartment,
    OnSubmit,
  ] = RegisterHook();

  // const [isOpen, setIsOpen] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      OnSubmit();
    }
  };

  const inputClass =
    "w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition text-lg text-right";
  const labelClass = "block text-gray-700 font-medium mb-2 text-lg text-right";
  const iconContainerClass =
    "absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100";
  const iconClass = "text-indigo-600 text-lg";

  return (
    <div className="flex justify-center mt-10">
      {/* Trigger Button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700"
      >
        فتح نافذة التسجيل
      </button> */}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/30 backdrop-blur-sm">
          <div
            dir="rtl"
            className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-5xl overflow-y-auto max-h-[90vh]"
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={close}
                className="text-gray-600 hover:text-red-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Header */}
            {/* <div className="flex flex-col md:flex-row items-center mb-6">
              <img
                src={urLogo}
                alt="logo"
                className="w-[100px] h-[100px] object-contain"
              />
              <div className="mr-4 text-center md:text-right">
                <h2 className="text-3xl font-bold text-indigo-600">
                  تسجيل حساب جديد
                </h2>
                <p className="text-xl font-bold text-gray-500">منتجات اور</p>
              </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Info */}
              <div className="md:col-span-3">
                <h3 className="text-xl font-bold text-indigo-600 mb-4 text-right border-r-4 border-indigo-500 pr-3">
                  اضافة مستخدم
                </h3>
              </div>

              <div>
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
                    <option value="assistant">متابعة</option>
                  </select>
                  <div className={iconContainerClass}>
                    <FaIdCard className={iconClass} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="department" className={labelClass}>
                  القسم
                </label>
                <div className="relative">
                  <select
                    id="department"
                    value={department}
                    onChange={onChangeDepartment}
                    className={inputClass}
                    dir="rtl"
                  >
                    <option value="">اختر القسم</option>
                    <option value="البرمجيات وتكنلوجيا المعلومات">
                      البرمجيات وتكنلوجيا المعلومات
                    </option>
                    <option value="الاتصالات">الاتصالات</option>
                    <option value="الانذار والاطفاء">الانذار والاطفاء</option>
                    <option value="السيطرة">السيطرة</option>
                    <option value="الطاقة">الطاقة</option>
                    <option value="التسويق">التسويق</option>
                    <option value="قسم المتابعة">المتابعة</option>
                  </select>
                  <div className={iconContainerClass}>
                    <FaIdCard className={iconClass} />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="md:col-span-3 mt-4">
                <h3 className="text-xl font-bold text-indigo-600 mb-4 text-right border-r-4 border-indigo-500 pr-3">
                  معلومات الاتصال
                </h3>
              </div>

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

              {/* Account Info */}
              <div className="md:col-span-3 mt-4">
                <h3 className="text-xl font-bold text-indigo-600 mb-4 text-right border-r-4 border-indigo-500 pr-3">
                  معلومات الحساب
                </h3>
              </div>

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
                <Toaster />
          
        </div>
      )}
    </div>
  );
};

export default Register;

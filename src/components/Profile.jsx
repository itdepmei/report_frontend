import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaRegBuilding,
  FaEdit,
  FaCamera,
  FaEllipsisV,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <div className="bg-white text-gray-800 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">الملف الشخصي</h1>
          <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md flex items-center gap-2 transition-all">
            <FaEllipsisV />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col items-center">
                <div className="relative">
                  <img
                    src="/api/placeholder/120/120"
                    alt=""
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all">
                    <FaCamera size={12} />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {user.role === "user" ? "مستخدم" : "أدمن"}
                </p>

                <button className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all">
                  <FaEdit size={14} />
                  <span>تعديل الملف</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="mt-2 w-full bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex items-center p-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    معلومات الاتصال
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <ul className="divide-y divide-gray-100">
                  <li className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400">
                          <FaEnvelope />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            البريد الإلكتروني
                          </div>
                          <div className="font-medium text-gray-800">
                            {user.email || "user@example.com"}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEdit size={14} />
                      </button>
                    </div>
                  </li>

                  <li className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400">
                          <FaPhone />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            رقم الهاتف
                          </div>
                          <div className="font-medium text-gray-800">
                            {user.phone || "07XX XXX XXXX"}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEdit size={14} />
                      </button>
                    </div>
                  </li>

                  <li className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-gray-400">
                          <FaRegBuilding />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">القسم</div>
                          <div className="font-medium text-gray-800">
                            {user.department}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEdit size={14} />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

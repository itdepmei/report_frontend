import React from "react";
import { Home, FileText, Send, LogOut, Users, History  } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-blue-50 text-blue-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
        UR
      </h2>

      <ul className="space-y-6">
        <Link to="/">
          <li className="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-300/50 transition-all duration-300 cursor-pointer group">
            <Home
              className="text-blue-500 group-hover:scale-110 transition-transform"
              size={20}
            />

            <span className="group-hover:text-blue-700 transition-colors">
              الرئيسية
            </span>
          </li>
        </Link>
        <Link to="/report">
          <li className="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-300/50 transition-all duration-300 cursor-pointer group">
            <FileText
              className="text-blue-500 group-hover:scale-110 transition-transform"
              size={20}
            />

            <span className="group-hover:text-blue-700 transition-colors">
              التقارير
            </span>
          </li>
        </Link>
        {user && user.role === "assistant" && (
          <Link to="/sendReport">
            <li className="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-300/50 transition-all duration-300 cursor-pointer group">
              <Send
                className="text-blue-500 group-hover:scale-110 transition-transform"
                size={20}
              />
              <span className="group-hover:text-blue-700 transition-colors">
                التقارير المرسلة
              </span>
            </li>
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link to="/allUser">
            <li className="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-300/50 transition-all duration-300 cursor-pointer group">
              <Users
                className="text-blue-500 group-hover:scale-110 transition-transform"
                size={20}
              />
              <span className="group-hover:text-blue-700 transition-colors">
                المستخدمين
              </span>
            </li>
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link to="/log">
            <li className="flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-blue-300/50 transition-all duration-300 cursor-pointer group">
              <History
                className="text-blue-500 group-hover:scale-110 transition-transform"
                size={20}
              />
              <span className="group-hover:text-blue-700 transition-colors">
                السجل
              </span>
            </li>
          </Link>
        )}

        <li onClick={handleLogout} className="flex items-center justify-start gap-3 p-2 mt-12 rounded-lg  transition-all duration-300 cursor-pointer group border-t border-blue-300 pt-6">
          <LogOut
            className="text-red-500 group-hover:scale-110 transition-transform"
            size={20}
          />

          <span className="group-hover:text-red-600 transition-colors">
            تسجيل الخروج
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

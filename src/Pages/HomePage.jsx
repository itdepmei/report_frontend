import React from "react";
import { Link, Links } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import AppCard from "../components/AppCard";

const HomePage = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="py-6 relative min-h-screen">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="flex flex-wrap justify-between items-center">
          {/* logo */}
          <div className="text-black font-bold text-4xl mb-4 sm:mb-0">UR</div>

          {/* menu */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-10 space-y-4 sm:space-y-0 mb-4 sm:mb-0">
            <a href="#" className="text-black text-lg hover:text-gray-600">
              Home
            </a>
            <a href="#" className="text-black text-lg hover:text-gray-600">
              About
            </a>
            <a href="#" className="text-black text-lg hover:text-gray-600">
              Contact
            </a>
          </div>

          {/* login or profile */}
          {token ? (
            <Link
              to="/profile"
              className="text-black text-lg hover:text-gray-600 flex items-center space-x-2"
            >
              <FaUserCircle size={30} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-black text-lg hover:text-gray-600 flex items-center space-x-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* نصف دائرة أسفل الصفحة */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[400px] bg-gray-200 lg:rounded-t-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 gap-10">
          <AppCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

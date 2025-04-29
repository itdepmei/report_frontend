import React from "react";
import { Link } from "react-router-dom";
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
          <div className="flex flex-col sm:flex-row items-center  sm:space-x-10 space-y-4 sm:space-y-0 mb-4 sm:mb-0">
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

      <div className="container mx-auto px-6 py-8 md:py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-900 text-transparent bg-clip-text py-2 rtl"
            style={{
              direction: "rtl",
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.3",
              padding: "0.5rem 0",
            }}
          >
            نظام إدارة التقارير
          </h1>
          <div className="h-1 w-24 bg-blue-600 rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
            منصة متكاملة لإدارة وتنظيم التقارير بكفاءة عالية
          </p>
        </div>
      </div>

      {/* نصف دائرة أسفل الصفحة */}
      <div className="w-full min-h-[420px] bg-gray-200 lg:rounded-t-full flex justify-center items-center">
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-[100px]">
          <AppCard />
       
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";

const HomePage = () => {
  return (
    <div className="py-6 relative min-h-screen">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="text-black font-bold text-2xl mx-[100px]">UR</div>

          {/* menu */}
          <div className="flex items-center space-x-[80px]">
            <a href="#" className="text-black hover:text-gray-600">
              Home
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              About
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Contact
            </a>
          </div>

          {/* login */}
          <div className="flex items-center space-x-4 mx-[100px]">
            <a href="/login" className="text-black hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* نصف دائرة أسفل الصفحة */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[400px] bg-gray-200 rounded-t-full">
      
      </div>
    </div>
  );
};

export default HomePage;

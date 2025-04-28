import React from "react";
import { FileText } from "lucide-react"; 
import { Link } from "react-router-dom";

const AppCard = () => {
  return (
    <div>
      <Link to="/report">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[120px] h-[120px] flex items-center justify-center">
          <FileText size={48} className="text-gray-700" />
        </div>
        <h3 className="text-md p-2 flex items-center justify-center ">
          التقرير اليومي
        </h3>
      </Link>
    </div>
  );
};

export default AppCard;

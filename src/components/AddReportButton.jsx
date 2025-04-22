import React from "react";
import { useDispatch } from "react-redux";
import { createReport } from "../redux/reportsSlice";
import { Plus } from "lucide-react";


const AddReportButton = () => {
    const dispatch = useDispatch();
  
    const handleAddReport = () => {
        const newReport = {
          date: new Date().toISOString()
        };
      
        dispatch(createReport(newReport));
      };
      
  
    return (
      <div dir="rtl" className="p-4">
        <button
          onClick={handleAddReport}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all duration-300 ease-in-out rtl"
        >
          <span className="text-md">إضافة تقرير</span>
          <Plus size={22} />
        </button>
      </div>
    );
  };
  
  export default AddReportButton;
  

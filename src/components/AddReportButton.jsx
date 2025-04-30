import React from "react";
import { useDispatch } from "react-redux";
import { createReport } from "../redux/reportsSlice";
import { Plus } from "lucide-react";
import notify from "../hook/useNotification";
import { Toaster } from "react-hot-toast";
const AddReportButton = () => {
  const dispatch = useDispatch();

  const handleAddReport = async () => {
    const newReport = {
      date: new Date().toISOString("ar-EG"),
    };

    try {
      const res = await dispatch(createReport(newReport)).unwrap();
      notify("تم إنشاء التقرير بنجاح", "success");
    } catch (error) {
      console.error(error);
      notify("حدث خطأ أثناء إنشاء التقرير", "error");
    }
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
      <Toaster  />

    </div>
  );
};

export default AddReportButton;

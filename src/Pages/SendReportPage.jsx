import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import Heading from "../components/Utils/Heading";
import Loader from "../components/Utils/Loader";
import Sidebar from "../components/Utils/Sidebar";
import AssistantReportCard from "../components/AssistantReportCard";
import GetAllSendReportHook from "../hook/get-all-send-report-hook";
import { Filter } from "lucide-react"; // أيقونة الفلتر من lucide-react

const SendReportPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("الكل");
  const [reportsByDate, isLoading] = GetAllSendReportHook(selectedDepartment);
  const filtterWord = localStorage.setItem("flitterWord", selectedDepartment);

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); 
 

  const departments = [
    "الكل",
    "البرمجيات وتكنلوجيا المعلومات",
    "الاتصالات",
    "الانذار والاطفاء",
    "السيطرة",
    "الطاقة",
    "التسويق",
    "قسم المتابعة",
  ];

  return (
    <div dir="rtl" className="flex min-h-screen">
    <div className="sticky top-0 self-start h-screen">
      <Sidebar />
    </div>
      <div className="flex-1 p-4">
        <Heading title="قائمة التقارير المرسلة" subtitle="قائمة التقارير" />

        {/* قسم الفلترة */}
        <div className="relative m-5">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-xl shadow-sm hover:bg-gray-50 transition duration-200"
          >
            <Filter size={20} />
            <span>{selectedDepartment}</span>
          </button>

          {showDropdown && (
            <ul className="absolute z-999 mt-2 w-64 bg-white border border-gray-300 rounded-xl shadow-lg p-2 space-y-2 ">
              {departments.map((dept) => (
                <li
                  key={dept}
                  onClick={() => {
                    setSelectedDepartment(dept);
                    setShowDropdown(false);
                  }}
                  className={`cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-100 ${
                    selectedDepartment === dept
                      ? "bg-blue-200 font-semibold"
                      : ""
                  }`}
                >
                  {dept}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* زر الانتقال الى صفحة التقارير */}
        <button
          onClick={() => navigate(`/departmentReport`)} // التوجيه إلى صفحة departmentReport
          className="mb-5 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          تقارير {selectedDepartment}
        </button>

        {/* عرض التقارير */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportsByDate && reportsByDate.length > 0 ? (
              reportsByDate.map((report) => (
                <AssistantReportCard
                  key={report._id}
                  id={report._id}
                  name={report.user.name}
                  date={report.date}
                />
              ))
            ) : (
              <p>لا توجد تقارير لهذا القسم.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendReportPage;

import React from "react";
import Heading from "../components/Utils/Heading";
import Loader from "../components/Utils/Loader";
import Sidebar from "../components/Utils/Sidebar";

import AssistantReportCard from "../components/AssistantReportCard";
import GetAllSendReportHook from "../hook/get-all-send-report-hook";

const SendReportPage = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const [data, isLoading] = GetAllSendReportHook();

  return (
    <div dir="rtl" className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Heading title="قائمة التقارير المرسلة" subtitle="قائمة التقارير" />
        {isLoading ? (
          <Loader />
        ) : (
          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data &&
              data.map((report) => (
                <AssistantReportCard
                  key={report._id}
                  id={report._id}
                  name={report.user.name}
                  date={report.date}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendReportPage;

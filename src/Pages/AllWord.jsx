import React from "react";
import DepartmentReportWord from "../components/DepartmentReportWord";
import GetAllSendReportHook from "../hook/get-all-send-report-hook";

const AllWord = () => {
  const flitterWord = localStorage.getItem("flitterWord");
  const [reportsByDate, isLoading] = GetAllSendReportHook(flitterWord);
  return (
    <div>
      {
    reportsByDate && reportsByDate.map((report) => (
      <DepartmentReportWord
        key={report._id}
        currentReportId={report._id}
        department={report.department}
        date={report.date}
        name={report.user?.name}
        tasks={report.tasks}
      />
    ))
  }
    </div>
  );
};

export default AllWord;

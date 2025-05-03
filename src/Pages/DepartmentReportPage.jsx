import React, { useState } from "react";
import GetAllSendReportHook from "../hook/get-all-send-report-hook";
import DepartmentReportTable from "../components/DepartmentReportTable";
import DepartmentReportWord from "../components/DepartmentReportWord";


const DepartmentReportPage = () => {
  const flitterWord = localStorage.getItem("flitterWord");
  const [reportsByDate, isLoading] = GetAllSendReportHook(flitterWord);

  
  return (
<div className="flex flex-col justify-center items-center">
  <div className="p-6">
    <DepartmentReportWord/>
  </div>
  {
    reportsByDate && reportsByDate.map((report) => (
      <DepartmentReportTable
        key={report._id}
        currentReportId={report._id}
        department={report.department}
        date={report.date}
        name={report.user?.name}
        tasks={report?.tasks}
        suggestions = {report?.suggestions}
        complaints={report?.complaints}
        Obstacles={report?.Obstacles}
        outOfHoursWork={report?.outOfHoursWork}
      />
    ))
  }
</div>

  );
};

export default DepartmentReportPage;

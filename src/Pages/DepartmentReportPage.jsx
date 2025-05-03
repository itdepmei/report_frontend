import React, { useState } from "react";
import GetAllSendReportHook from "../hook/get-all-send-report-hook";
import DepartmentReportTable from "../components/DepartmentReportTable";

const DepartmentReportPage = () => {
  const flitterWord = localStorage.getItem("flitterWord");
  const [reportsByDate, isLoading] = GetAllSendReportHook(flitterWord);

  
  return (
<div>
  {
    reportsByDate && reportsByDate.map((report) => (
      <DepartmentReportTable
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

export default DepartmentReportPage;

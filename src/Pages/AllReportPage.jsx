import React from "react";
import ReportCard from "../components/ReportCard";
import Heading from "../components/Utils/Heading";
import GetAllReportsHook from "../hook/get-all-reports-hook";
import Loader from "../components/Utils/Loader";

const AllReportPage = () => {
  const [data, isLoading] = GetAllReportsHook();

  return (
    <div className="p-4">
      <Heading title="قائمة التقارير" subtitle="قائمة التقارير" />
      {isLoading ? (
        <Loader />
      ) : (
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data &&
            data.map((report) => (
              <ReportCard id={report._id} name="تقرير" date={report.date} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AllReportPage;

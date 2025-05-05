import { useState } from "react";
import systemsLogo from "../assets/systemslogo.jpg";
import urLogo from "../assets/urlogo.png";
import GetOneReportHook from "../hook/get-one_report-hook";
import GetTasksFromReportHook from "../hook/get-tasks-from-report-hook";
import GetAllSuggestionsHook from "../hook/get-all-suggestions-hook";
import GetAllComplaintsHook from "../hook/get-all-complaints-hook";
import GetAllObstaclesHook from "../hook/get-all-obstacles-hook";
import GetAllOutOfHoursWorkHook from "../hook/get-all-outOfHoursWork-hook";
import formatTime from "../hook/UtilsFunctions/FormatTime";
import formatDate from "../hook/UtilsFunctions/FormatDate";

const DepartmentReportTable = ({
  currentReportId,
  department,
  date,
  name,
  tasks,
  suggestions,
  complaints,
  Obstacles,
  outOfHoursWork,
}) => {


  return (
    <div className="mb-12">
      <div
        className="w-[297mm] h-auto bg-white p-2 mx-auto font-sans text-sm relative"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex mb-1 p-4">
          <div className="text-sm text-right leading-tight absolute right-2">
            <img src={urLogo} className="w-44" />
          </div>

          <div className="text-sm absolute left-2">
            <img src={systemsLogo} className="w-44" />
          </div>
        </div>

        <div className="w-full mx-2 flex-grow flex flex-col items-center justify-center font-bold mt-[150px]">
          <h6 className="text-3xl">شركة هندسة المارج للصناعات الالكترونية </h6>
          <h6 className="text-3xl ">استمارة التقرير اليومي</h6>
          <h6 className="text-3xl mt-4">{formatDate(date || "")}</h6>
        </div>

        {/* table */}
        <div className="m-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="grid grid-cols-8">
                <th className="border border-black p-1 text-xl bg-gray-300">
                  ت
                </th>
                <th className="col-span-3 border border-black p-1 text-xl bg-gray-300">
                  المهام
                </th>
                <th className="col-span-2 border border-black p-1 text-xl bg-gray-300">
                  الوقت
                </th>
                <th className="col-span-2 border border-black p-1 text-xl bg-gray-300">
                  الملاحظات
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {tasks && tasks.length > 0 ? (
                tasks.map((taskItem, index) => (
                  <tr key={index} className="grid grid-cols-8">
                    <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                      {index + 1}
                    </td>

                    <td className="col-span-3 border border-black p-1 text-md text-right break-words min-min-h-10">
                      {taskItem.title}
                    </td>
                    <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                      {formatTime(taskItem.timeStart)} -{" "}
                      {formatTime(taskItem.timeEnd)}
                    </td>
                    <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10 flex items-center justify-center">
                      {taskItem.note}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="grid grid-cols-8">
                  <td className="border border-black p-1 text-xs text-center break-words min-h-10"></td>
                  <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10"></td>
                  <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10"></td>
                  <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10"></td>
                </tr>
              )}

              <tr className="grid grid-cols-8 ">
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(tasks?.length || 0) + 1}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  المقترحات التي تخص العمل
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  لا يوجد
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10">
                {suggestions && suggestions[0]?.note || "لا يوجد"}
                </td>
              </tr>
              <tr className="grid grid-cols-8">
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(tasks?.length || 0) + 2}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  الشكاوى
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  لا يوجد
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10 flex items-center justify-center">
                  {complaints && complaints[0]?.note || "لا يوجد" }
                </td>
              </tr>
              <tr className="grid grid-cols-8">
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(tasks?.length || 0) + 3}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  المعوقات
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  لا يوجد
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10 flex items-center justify-center">
                  {Obstacles && Obstacles[0]?.note || "لا يوجد" }
                </td>
              </tr>
              <tr className="grid grid-cols-8">
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(tasks?.length || 0) + 4}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  اعمال منفذة خارج أوقات الدوام الرسمي
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  {outOfHoursWork &&
                  outOfHoursWork[0]?.timeStart &&
                  outOfHoursWork[0]?.timeEnd
                    ? `${outOfHoursWork[0].timeStart} - ${outOfHoursWork[0].timeEnd}`
                    : "لا يوجد"}
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10 flex items-center justify-center">
                  {outOfHoursWork && outOfHoursWork[0]?.note}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-sm absolute left-2">
          <div className="text-xl font-bold">الاسم: {name}</div>
          <div className="text-xl font-bold">قسم: {department} </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentReportTable;

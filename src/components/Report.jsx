import React from "react";
import systemsLogo from "../assets/systemslogo.jpg";
import urLogo from "../assets/urlogo.png";
import GetAllReportsHook from "../hook/get-all-reports-hook";
import { useParams } from "react-router-dom";
import GetOneReportHook from "../hook/get-one_report-hook";
import GetTasksFromReportHook from "../hook/get-tasks-from-report-hook";
import formatDate from "../hook/UtilsFunctions/FormatDate";
import GetAllSuggestionsHook from "../hook/get-all-suggestions-hook";
import GetAllComplaintsHook from "../hook/get-all-complaints-hook";
import GetAllObstaclesHook from "../hook/get-all-obstacles-hook";
import GetAllOutOfHoursWorkHook from "../hook/get-all-outOfHoursWork-hook";
import { AsteriskSquare, Eye, FileText, Pencil, Trash2 } from "lucide-react";

const Report = () => {
  const { id } = useParams();
  const [singleReport] = GetOneReportHook(id);
  const [task] = GetTasksFromReportHook(id);
  const [suggestion] = GetAllSuggestionsHook(id);
  const [complaint] = GetAllComplaintsHook(id);
  const [obstacle] = GetAllObstaclesHook(id);
  const [outOfHoursWork] = GetAllOutOfHoursWorkHook(id);

  return (
    <div
      className="w-[297mm] h-[210mm] bg-white p-2 mx-auto font-sans text-sm relative"
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
        <h6 className="text-3xl mt-4">
          يوم الاحد {formatDate(singleReport?.date || "")}
        </h6>
      </div>

      {/* table */}
      <div className="m-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-10">
              <th className="border border-black p-1 text-xl bg-gray-300">ت</th>
              <th className="col-span-3 border border-black p-1 text-xl bg-gray-300">
                المهام
              </th>
              <th className="col-span-2 border border-black p-1 text-xl bg-gray-300">
                الوقت
              </th>
              <th className="col-span-2 border border-black p-1 text-xl bg-gray-300">
                الملاحظات
              </th>
              <th className="col-span-2 border border-black p-1 text-xl bg-gray-300">
                الإجراء
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {task && task.length > 0 ? (
              task.map((taskItem, index) => (
                <tr key={index} className="grid grid-cols-10">
                  <td className="border border-black p-1 text-xs text-center break-words h-10">
                    {index + 1}
                  </td>
                  <td className="col-span-3 border border-black p-1 text-md text-right break-words h-10">
                    {taskItem.title}
                  </td>
                  <td className="col-span-2 border border-black p-1 text-md text-center break-words h-10">
                    {taskItem.timeStart} - {taskItem.timeEnd}
                  </td>
                  <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10">
                    {taskItem.note}
                  </td>
                  <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10">
                    <div className="flex gap-2">
                      <button className="p-2 text-rose-600 hover:text-rose-800 " aria-label="حذف">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-emerald-600 hover:text-emerald-800"
                        aria-label="تعديل"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="grid grid-cols-10">
                <td className="border border-black p-1 text-xs text-center break-words h-10"></td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words h-10"></td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words h-10"></td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
                <td className="col-span-2 border border-black p-1 text-center break-words h-10"></td>
              </tr>
            )}

            <tr className="grid grid-cols-10">
              <td className="border border-black p-1 text-xs text-center break-words h-10">
                {(task?.length || 0) + 1}
              </td>
              <td className="col-span-3 border border-black p-1 text-md text-right break-words h-10 font-bold">
                المقترحات التي تخص العمل
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-center break-words h-10">
                لا يوجد
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10">
                {suggestion && suggestion[0]?.note}
              </td>
              <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10">
                <div className="flex gap-2">
                  <button className="p-2 text-rose-600 hover:text-rose-800 " aria-label="حذف">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-emerald-600 hover:text-emerald-800" aria-label="تعديل">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-10">
              <td className="border border-black p-1 text-xs text-center break-words h-10">
                {(task?.length || 0) + 2}
              </td>
              <td className="col-span-3 border border-black p-1 text-md text-right break-words h-10 font-bold">
                الشكاوى
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-center break-words h-10">
                لا يوجد
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10">
                {complaint && complaint[0]?.note}
              </td>
              <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10">
                <div className="flex gap-2">
                  <button className="p-2 text-rose-600 hover:text-rose-800" aria-label="حذف">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-emerald-600 hover:text-emerald-800" aria-label="تعديل">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-10">
              <td className="border border-black p-1 text-xs text-center break-words h-10">
                {(task?.length || 0) + 3}
              </td>
              <td className="col-span-3 border border-black p-1 text-md text-right break-words h-10 font-bold">
                المعوقات
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-center break-words h-10">
                لا يوجد
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10">
                {obstacle && obstacle[0]?.note}
              </td>
              <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10">
                <div className="flex gap-2">
                  <button className="p-2 text-rose-600 hover:text-rose-800" aria-label="حذف">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-emerald-600 hover:text-emerald-800" aria-label="تعديل">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="grid grid-cols-10">
              <td className="border border-black p-1 text-xs text-center break-words h-10">
                {(task?.length || 0) + 4}
              </td>
              <td className="col-span-3 border border-black p-1 text-md text-right break-words h-10 font-bold">
                اعمال منفذة خارج أوقات الدوام الرسمي
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-center break-words h-10">
                {outOfHoursWork &&
                outOfHoursWork[0]?.timeStart &&
                outOfHoursWork[0]?.timeEnd
                  ? `${outOfHoursWork[0].timeStart} - ${outOfHoursWork[0].timeEnd}`
                  : "لا يوجد"}
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10">
                {outOfHoursWork && outOfHoursWork[0]?.note}
              </td>
              <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10">
                <div className="flex gap-2">
                  <button className="p-2 text-rose-600 hover:text-rose-800" aria-label="حذف">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-emerald-600 hover:text-emerald-800" aria-label="تعديل">
                    <Pencil className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-sm absolute left-2">
        <div className="text-xl font-bold">الاسم: الحسن محمد رشيد</div>
        <div className="text-xl font-bold">
          قسم: البرمجيات وتكنلوجيا المعلومات{" "}
        </div>
      </div>
    </div>
  );
};

export default Report;

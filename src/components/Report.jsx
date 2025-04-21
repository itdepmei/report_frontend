import React from "react";
import systemsLogo from "../assets/systemslogo.jpg";
import urLogo from "../assets/urlogo.png";
import GetAllReportsHook from "../hook/get-all-reports-hook";
import { useParams } from "react-router-dom";
import GetOneReportHook from "../hook/get-one_report-hook";

const Report = () => {
  const { id } = useParams();
  const [singleReport, isLoading] = GetOneReportHook(id);
 

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

      <div className="w-full  mx-2 flex-grow flex flex-col items-center justify-center font-bold mt-[150px]">
        <h6 className="text-3xl">شركة هندسة المارج للصناعات الالكترونية </h6>
        <h6 className="text-3xl ">استمارة التقرير اليومي</h6>
        <h6 className="text-3xl mt-4">{singleReport.date} يوم الاحد </h6>
      </div>

      {/* table */}
      <div className="m-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-9">
              <th className="border border-black p-1 text-xl bg-gray-300">ت</th>
              <th className="col-span-4  border border-black p-1 text-xl bg-gray-300">
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
            <tr className="grid grid-cols-9">
              <td className="border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-4 border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-2 border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-2 border border-black p-1 text-xs text-center break-words h-10"></td>
            </tr>

            <tr className="grid grid-cols-9">
              <td className="border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-4 border border-black p-1 text-md text-right break-words h-10 font-bold">
                المقترحات التي تخص العمل
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
            </tr>
            <tr className="grid grid-cols-9">
              <td className="border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-4 border border-black p-1 text-md text-right break-words h-10 font-bold">
                الشكاوى
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
            </tr>
            <tr className="grid grid-cols-9">
              <td className="border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-4 border border-black p-1 text-md text-right break-words h-10 font-bold">
                المعوقات
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
            </tr>
            <tr className="grid grid-cols-9">
              <td className="border border-black p-1 text-xs text-center break-words h-10"></td>
              <td className="col-span-4 border border-black p-1 text-md text-right break-words h-10 font-bold">
                اعمال منفذة خارج أوقات الدوام الرسمي
              </td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
              <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10"></td>
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

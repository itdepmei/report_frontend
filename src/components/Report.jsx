import React, { useState } from "react";
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
import { Pencil, Trash2, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";
import { deleteSuggestion } from "../redux/suggestionsSlice";
import { deleteComplaint } from "../redux/complaintsSlice";
import { deleteObstacle } from "../redux/obstaclesSlice";
import { deleteOutOfHoursWork } from "../redux/outOfHoursWorkSlice";
import TasksModal from "./modal/TasksModal";
import SuggestionsModal from "./modal/suggestionsModal";
import ComplaintModal from "./modal/ComplaintModal";
import ObstacleModal from "./modal/ObstacleModal";
import OutOfHoursWorkModal from "./modal/OutOfHoursWorkModal";
import ReportWord from "./ReportWord";
import formatTime from "../hook/UtilsFunctions/FormatTime";

const Report = () => {
  const dispatch = useDispatch();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isObstacleModalOpen, setIsObstacleModalOpen] = useState(false);
  const [isOutOfHoursWorkModalOpen, setIsOutOfHoursWorkModalOpen] =
    useState(false);

  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);

  const [singleReport] = GetOneReportHook(id);
  const [task] = GetTasksFromReportHook(id, refresh);
  const [suggestion] = GetAllSuggestionsHook(id, refresh);
  const [complaint] = GetAllComplaintsHook(id, refresh);
  const [obstacle] = GetAllObstaclesHook(id, refresh);
  const [outOfHoursWork] = GetAllOutOfHoursWorkHook(id, refresh);

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const handleOpenSuggestionsModal = () => {
    setIsSuggestionsModalOpen(!isSuggestionsModalOpen);
  };

  const handleOpenComplaintModal = () => {
    setIsComplaintModalOpen(!isComplaintModalOpen);
  };

  const handleOpenObstacleModal = () => {
    setIsObstacleModalOpen(!isObstacleModalOpen);
  };

  const handleOpenOutOfHoursWorkModal = () => {
    setIsOutOfHoursWorkModalOpen(!isOutOfHoursWorkModalOpen);
  };

  const handleDeleteTask = async (id) => {
    await dispatch(deleteTask(id));
    setRefresh(!refresh);
  };

  const handleDeleteSuggestion = async (id) => {
    await dispatch(deleteSuggestion(id));
    setRefresh(!refresh);
  };

  const handleDeleteComplaint = async (id) => {
    await dispatch(deleteComplaint(id));
    setRefresh(!refresh);
  };

  const handleDeleteObstacle = async (id) => {
    await dispatch(deleteObstacle(id));
    setRefresh(!refresh);
  };

  const handleDeleteOutOfHoursWork = async (id) => {
    await dispatch(deleteOutOfHoursWork(id));
    setRefresh(!refresh);
  };

  return (
    <div>
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
            {formatDate(singleReport?.date || "")}
          </h6>
        </div>
        <ReportWord id={id}/>

        <div dir="rtl" className="p-4">
          <button
            onClick={handleOpenTaskModal}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all duration-300 ease-in-out rtl"
          >
            <span className="text-md">إضافة مهمة</span>
            <Plus size={22} />
          </button>
        </div>

        {/* table */}
        <div className="m-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="grid grid-cols-10">
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
                      {formatTime(taskItem.timeStart)} - {formatTime(taskItem.timeEnd)}
                    </td>
                    <td className="col-span-2 border border-black p-1 text-md text-right break-words h-10">
                      {taskItem.note}
                    </td>
                    <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteTask(taskItem._id)}
                          className="p-2 text-rose-600 hover:text-rose-800 "
                          aria-label="حذف"
                        >
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
                  <td className="col-span-2 border border-black p-1 flex justify-center items-center h-10"></td>
                </tr>
              )}

              <tr className="grid grid-cols-10 ">
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
                    {suggestion && suggestion[0]?._id ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeleteSuggestion(suggestion[0]?._id)
                          }
                          className="p-2 text-rose-600 hover:text-rose-800 "
                          aria-label="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-emerald-600 hover:text-emerald-800"
                          aria-label="تعديل"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800"
                        aria-label="إضافة"
                        onClick={handleOpenSuggestionsModal}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
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
                    {complaint && complaint[0]?._id ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeleteComplaint(complaint[0]?._id)
                          }
                          className="p-2 text-rose-600 hover:text-rose-800"
                          aria-label="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-emerald-600 hover:text-emerald-800"
                          aria-label="تعديل"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800"
                        aria-label="إضافة"
                        onClick={handleOpenComplaintModal}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
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
                    {obstacle && obstacle[0]?._id ? (
                      <>
                        <button
                          onClick={() => handleDeleteObstacle(obstacle[0]?._id)}
                          className="p-2 text-rose-600 hover:text-rose-800"
                          aria-label="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-emerald-600 hover:text-emerald-800"
                          aria-label="تعديل"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800"
                        aria-label="إضافة"
                        onClick={handleOpenObstacleModal}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
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
                    {outOfHoursWork && outOfHoursWork[0]?._id ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeleteOutOfHoursWork(outOfHoursWork[0]?._id)
                          }
                          className="p-2 text-rose-600 hover:text-rose-800"
                          aria-label="حذف"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-emerald-600 hover:text-emerald-800"
                          aria-label="تعديل"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800"
                        aria-label="إضافة"
                        onClick={handleOpenOutOfHoursWorkModal}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
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
      {isTaskModalOpen && <TasksModal onClose={handleOpenTaskModal} id={id} />}
      {isSuggestionsModalOpen && (
        <SuggestionsModal onClose={handleOpenSuggestionsModal} id={id} />
      )}

      {isComplaintModalOpen && (
        <ComplaintModal onClose={handleOpenComplaintModal} id={id} />
      )}

      {isObstacleModalOpen && (
        <ObstacleModal onClose={handleOpenObstacleModal} id={id} />
      )}

      {isOutOfHoursWorkModalOpen && (
        <OutOfHoursWorkModal onClose={handleOpenOutOfHoursWorkModal} id={id} />
      )}
    </div>
  );
};

export default Report;

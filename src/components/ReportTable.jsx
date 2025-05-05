import systemsLogo from "../assets/systemslogo.jpg";
import urLogo from "../assets/urlogo.png";

import formatDate from "../hook/UtilsFunctions/FormatDate";
import { Pencil, Trash2, Plus } from "lucide-react";
import TasksModal from "./modal/TasksModal";
import SuggestionsModal from "./modal/suggestionsModal";
import ComplaintModal from "./modal/ComplaintModal";
import ObstacleModal from "./modal/ObstacleModal";
import OutOfHoursWorkModal from "./modal/OutOfHoursWorkModal";
import formatTime from "../hook/UtilsFunctions/FormatTime";
import { useState } from "react";
import UpdateTasksModal from "./modal/UpdateTasksModal";
const ReportTable = ({
  singleReport,
  task,
  suggestion,
  complaint,
  obstacle,
  outOfHoursWork,
  isTaskModalOpen,
  isSuggestionsModalOpen,
  isComplaintModalOpen,
  isObstacleModalOpen,
  isOutOfHoursWorkModalOpen,
  handleOpenTaskModal,
  handleOpenSuggestionsModal,
  handleOpenComplaintModal,
  handleOpenObstacleModal,
  handleOpenOutOfHoursWorkModal,
  handleDeleteTask,
  handleDeleteSuggestion,
  handleDeleteComplaint,
  handleDeleteObstacle,
  handleDeleteOutOfHoursWork,
  id,
}) => {
  const [clickedTask, setClickedTask] = useState(null);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);

  const handleClickEdit = (taskId) => {
    setClickedTask(taskId);
     setIsUpdateTaskModalOpen(true); // فتح المودال فورًا بعد تعيين الـ ID
  };

  const handleCloseUpdateTaskModal = () => {
    setIsUpdateTaskModalOpen(false);
    setClickedTask(null);
  };
  return (
    <div>
      <div
        className="w-[297mm] h-[210mm] bg-white p-2 mx-auto font-sans text-sm relative mt-4"
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
                    <td className="col-span-2 border border-black p-1 flex justify-center items-center min-h-10">
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
                          onClick={() => handleClickEdit(taskItem._id)}
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="grid grid-cols-10">
                  <td className="border border-black p-1 text-xs text-center break-words min-h-10"></td>
                  <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10"></td>
                  <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10"></td>
                  <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10"></td>
                  <td className="col-span-2 border border-black p-1 flex justify-center items-center min-h-10"></td>
                </tr>
              )}

              <tr className="grid grid-cols-10 ">
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(task?.length || 0) + 1}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  المقترحات التي تخص العمل
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  لا يوجد
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10">
                  {suggestion && suggestion[0]?.note}
                </td>
                <td className="col-span-2 border border-black p-1 flex justify-center items-center min-h-10">
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
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(task?.length || 0) + 2}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  الشكاوى
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  لا يوجد
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10 flex items-center justify-center">
                  {complaint && complaint[0]?.note}
                </td>
                <td className="col-span-2 border border-black p-1 flex justify-center items-center min-h-10">
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
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(task?.length || 0) + 3}
                </td>
                <td className="col-span-3 border border-black p-1 text-md text-right break-words min-h-10 font-bold flex items-center justify-center">
                  المعوقات
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-center break-words min-h-10 flex items-center justify-center">
                  لا يوجد
                </td>
                <td className="col-span-2 border border-black p-1 text-md text-right break-words min-h-10 flex items-center justify-center">
                  {obstacle && obstacle[0]?.note}
                </td>
                <td className="col-span-2 border border-black p-1 flex justify-center items-center min-h-10">
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
                <td className="border border-black p-1 text-xs text-center break-words min-h-10 flex items-center justify-center">
                  {(task?.length || 0) + 4}
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
                <td className="col-span-2 border border-black p-1 flex justify-center items-center min-h-10">
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
          <div className="text-xl font-bold">
            الاسم: {singleReport?.user?.name}
          </div>
          <div className="text-xl font-bold">
            قسم: البرمجيات وتكنلوجيا المعلومات{" "}
          </div>
        </div>
      </div>
      {isTaskModalOpen && <TasksModal onClose={handleOpenTaskModal} id={id} />}
      {isUpdateTaskModalOpen && clickedTask && (
        <UpdateTasksModal
          onClose={handleCloseUpdateTaskModal}
          id={clickedTask}
        />
      )}
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

export default ReportTable;

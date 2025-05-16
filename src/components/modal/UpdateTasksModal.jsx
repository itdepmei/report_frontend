import React, { useEffect, useState } from "react";
import { X, Calendar, Clock, AlignLeft, Check } from "lucide-react";
import AddTaskHook from "../../hook/add-task-hook";
import { Toaster } from "react-hot-toast";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import UpdateTaskHook from "../../hook/update-task-hook";

const UpdateTasksModal = ({ onClose, id, reportId }) => {
  const [
    newTaskTitle,
    newTimeStart,
    newTimeEnd,
    newNote,
    handleTaskTitleUpdate,
    handleTimeStartUpdate,
    handleTimeEndUpdate,
    handleNoteUpdate,
    handleUpdateTask,
  ] = UpdateTaskHook(id, reportId);


  // استخدام حالة محلية للتعامل مع قيم مكتبة TimePicker
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // عند تحديث newTimeStart و newTimeEnd يتم ضبط startTime و endTime
  useEffect(() => {
    if (newTimeStart) setStartTime(newTimeStart);
    if (newTimeEnd) setEndTime(newTimeEnd);
  }, [newTimeStart, newTimeEnd]);

  const onStartTimeChange = (value) => {
    setStartTime(value);
    handleTimeStartUpdate({ target: { value } });
  };

  const onEndTimeChange = (value) => {
    setEndTime(value);
    handleTimeEndUpdate({ target: { value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateTask();
    onClose();
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            تعديل مهمة
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Calendar size={16} className="ml-2 text-blue-500" />
              <span>عنوان المهمة</span>
            </label>
            <input
              type="text"
              name="title"
              value={newTaskTitle}
              onChange={handleTaskTitleUpdate}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
              placeholder="أدخل عنوان المهمة"
              dir="rtl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock size={16} className="ml-2 text-blue-500" />
                <span>وقت البدء</span>
              </label>
              <div className="relative time-picker-container" dir="ltr">
                <TimePicker
                  onChange={onStartTimeChange}
                  value={startTime}
                  format="HH:mm"
                  clearIcon={null}
                  disableClock
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Clock size={16} className="ml-2 text-blue-500" />
                <span>وقت الانتهاء</span>
              </label>
              <div className="relative time-picker-container" dir="ltr">
                <TimePicker
                  onChange={onEndTimeChange}
                  value={endTime}
                  format="HH:mm"
                  clearIcon={null}
                  disableClock
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <AlignLeft size={16} className="ml-2 text-blue-500" />
              <span>ملاحظة</span>
            </label>
            <textarea
              name="note"
              value={newNote}
              onChange={handleNoteUpdate}
              rows="3"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
              placeholder="أضف ملاحظات إضافية هنا..."
              dir="rtl"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-colors flex items-center shadow-md"
            >
              <Check className="ml-2" size={18} />
              تعديل{" "}
            </button>
          </div>
        </form>
      </div>

      {/* إضافة CSS لتحسين مظهر منتقي الوقت */}
      <style jsx>{`
        .time-picker-container .react-time-picker {
          width: 100%;
        }

        .time-picker-container .react-time-picker__wrapper {
          border: none;
          padding: 8px;
          display: flex;
          align-items: center;
          height: 52px;
        }

        .time-picker-container .react-time-picker__inputGroup {
          font-size: 16px;
          text-align: center;
          width: 100%;
        }

        /* تحسين شكل الأزرار */
        .time-picker-container .react-time-picker__button {
          color: #3b82f6;
          padding: 4px;
        }

        .time-picker-container .react-time-picker__button:hover {
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
        }

        /* تحسين مظهر الحقول في الوضع المظلم */
        .dark .time-picker-container .react-time-picker__wrapper {
          color: white;
        }

        .dark .time-picker-container .react-time-picker__button {
          stroke: #e5e7eb;
        }

        .dark .time-picker-container .react-time-picker__button:hover {
          background-color: rgba(229, 231, 235, 0.1);
        }
      `}</style>

      <Toaster />
    </div>
  );
};

export default UpdateTasksModal;

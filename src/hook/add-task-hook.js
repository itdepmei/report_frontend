import React, { useState } from "react";
import { addTask, updateTask } from "../redux/tasksSlice";
import { useDispatch } from "react-redux";
import notify from "./useNotification";

const AddTaskHook = (reportId) => {
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [note, setNote] = useState("");

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTimeStartChange = (event) => {
    setTimeStart(event.target.value);
  };

  const handleTimeEndChange = (event) => {
    setTimeEnd(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleAddTask = () => {
    if (!taskTitle || !timeStart || !timeEnd ) {
      notify("يرجى ملء جميع الحقول قبل إضافة المهمة", "error");
      return;
    }

    const newTask = {
      title: taskTitle,
      timeStart: timeStart,
      timeEnd: timeEnd,
      note: note || "لا يوجد",  
      report: reportId,
    };
    

    dispatch(addTask({ reportId, taskData: newTask }));
    notify("تم إضافة المهمة بنجاح", "success");

    // إعادة تعيين الحقول بعد الإضافة (اختياري)
    setTaskTitle("");
    setTimeStart("");
    setTimeEnd("");
    setNote("");
  };

  const handleUpdateTask = () => {
    if (!taskTitle || !timeStart || !timeEnd) {
      notify("يرجى ملء جميع الحقول قبل تحديث المهمة", "error");
      return;
    }

    const newTask = {
      title: taskTitle,
      timeStart: timeStart,
      timeEnd: timeEnd,
      note: note,
      report: reportId,
    };

    dispatch(updateTask({ reportId, updatedData: newTask }));
    notify("تم تحديث المهمة بنجاح", "success");
  };

  return [
    taskTitle,
    timeStart,
    timeEnd,
    note,
    handleTaskTitleChange,
    handleTimeStartChange,
    handleTimeEndChange,
    handleNoteChange,
    handleAddTask,
    handleUpdateTask
  ];
};

export default AddTaskHook;

import React, { useState } from "react";
import { addTask } from "../redux/tasksSlice";
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
    if (!taskTitle || !timeStart || !timeEnd) {
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

    setTaskTitle("");
    setTimeStart("");
    setTimeEnd("");
    setNote("");
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
  ];
};

export default AddTaskHook;

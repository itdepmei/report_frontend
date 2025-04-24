import React, { useState } from "react";
import { addTask } from "../redux/tasksSlice";
import { useDispatch } from "react-redux";
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
    const newTask = {
      title: taskTitle,
      timeStart: timeStart,
      timeEnd: timeEnd,
      note: note,
      report: reportId, 
    };

    dispatch(addTask({ reportId, taskData: newTask }));
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

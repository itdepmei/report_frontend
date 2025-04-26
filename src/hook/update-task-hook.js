import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/tasksSlice";

const UpdateTaskHook = (reportId) => {
  const dispatch = useDispatch();

  const [newTaskTitle, setTaskTitle] = useState("");
  const [newTimeStart, setTimeStart] = useState("");
  const [newTimeEnd, setTimeEnd] = useState("");
  const [newNote, setNote] = useState("");

  const handleTaskTitleUpdate = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTimeStartUpdate = (event) => {
    setTimeStart(event.target.value);
  };

  const handleTimeEndUpdate = (event) => {
    setTimeEnd(event.target.value);
  };

  const handleNoteUpdate = (event) => {
    setNote(event.target.value);
  };

  const handleUpdateTask = () => {
    const newTask = {
      title: newTaskTitle,
      timeStart: newTimeStart,
      timeEnd: newTimeEnd,
      note: newNote,
      report: reportId,
    };

    dispatch(updateTask({ reportId, updatedData: newTask }));
  };

  return [
    newTaskTitle,
    newTimeStart,
    newTimeEnd,
    newNote,
    handleTaskTitleUpdate,
    handleTimeStartUpdate,
    handleTimeEndUpdate,
    handleNoteUpdate,
    handleUpdateTask,
  ];
};

export default UpdateTaskHook;

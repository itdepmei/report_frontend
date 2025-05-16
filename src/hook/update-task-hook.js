import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasksFromReport, updateTask } from "../redux/tasksSlice";
import GetOneTaskHook from "./get-one-task-hook";

const UpdateTaskHook = (id, reportId) => {
  const dispatch = useDispatch();
  const [singleTask, isLoading] = GetOneTaskHook(id);

  const [newTaskTitle, setTaskTitle] = useState("");
  const [newTimeStart, setTimeStart] = useState("");
  const [newTimeEnd, setTimeEnd] = useState("");
  const [newNote, setNote] = useState("");

  useEffect(() => {
    if (singleTask) {
      setTaskTitle(singleTask.title || "");
      setTimeStart(singleTask.timeStart || "");
      setTimeEnd(singleTask.timeEnd || "");
      setNote(singleTask.note || "");
    }
  }, [singleTask]);

  const handleTaskTitleUpdate = (event) => setTaskTitle(event.target.value);
  const handleTimeStartUpdate = (event) => setTimeStart(event.target.value);
  const handleTimeEndUpdate = (event) => setTimeEnd(event.target.value);
  const handleNoteUpdate = (event) => setNote(event.target.value);

  const handleUpdateTask = async () => {
    const newTask = {
      title: newTaskTitle,
      timeStart: newTimeStart,
      timeEnd: newTimeEnd,
      note: newNote,
    };
    await dispatch(updateTask({ id, updatedData: newTask }));

    await dispatch(getTasksFromReport(reportId));

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

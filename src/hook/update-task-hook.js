import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/tasksSlice";
import GetOneTaskHook from "./get-one-task-hook";

const UpdateTaskHook = (id) => {
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

  const handleUpdateTask = () => {
    const newTask = {
      title: newTaskTitle,
      timeStart: newTimeStart,
      timeEnd: newTimeEnd,
      note: newNote,
    };
    dispatch(updateTask({ id, updatedData: newTask }));
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

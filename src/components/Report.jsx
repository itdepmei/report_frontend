import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GetOneReportHook from "../hook/get-one_report-hook";
import GetTasksFromReportHook from "../hook/get-tasks-from-report-hook";
import GetAllSuggestionsHook from "../hook/get-all-suggestions-hook";
import GetAllComplaintsHook from "../hook/get-all-complaints-hook";
import GetAllObstaclesHook from "../hook/get-all-obstacles-hook";
import GetAllOutOfHoursWorkHook from "../hook/get-all-outOfHoursWork-hook";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasksSlice";
import { deleteSuggestion } from "../redux/suggestionsSlice";
import { deleteComplaint } from "../redux/complaintsSlice";
import { deleteObstacle } from "../redux/obstaclesSlice";
import { deleteOutOfHoursWork } from "../redux/outOfHoursWorkSlice";
import ReportWord from "./ReportWord";

import ReportTable from "./ReportTable";

const Report = () => {
  const dispatch = useDispatch();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
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
  const handleOpenUpdateTaskModal = () => {
    setIsUpdateTaskModalOpen(!isUpdateTaskModalOpen);
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
    <div className="flex flex-col justify-center items-center">
      <div className="p-6 ">
        <ReportWord id={id} />
      </div>
      <div>
        <ReportTable
          singleReport={singleReport}
          task={task}
          suggestion={suggestion}
          complaint={complaint}
          obstacle={obstacle}
          outOfHoursWork={outOfHoursWork}
          isTaskModalOpen={isTaskModalOpen}
          isSuggestionsModalOpen={isSuggestionsModalOpen}
          isComplaintModalOpen={isComplaintModalOpen}
          isObstacleModalOpen={isObstacleModalOpen}
          isOutOfHoursWorkModalOpen={isOutOfHoursWorkModalOpen}
          handleOpenTaskModal={handleOpenTaskModal}
          handleOpenSuggestionsModal={handleOpenSuggestionsModal}
          handleOpenComplaintModal={handleOpenComplaintModal}
          handleOpenObstacleModal={handleOpenObstacleModal}
          handleOpenOutOfHoursWorkModal={handleOpenOutOfHoursWorkModal}
          handleDeleteTask={handleDeleteTask}
          handleDeleteSuggestion={handleDeleteSuggestion}
          handleDeleteComplaint={handleDeleteComplaint}
          handleDeleteObstacle={handleDeleteObstacle}
          handleDeleteOutOfHoursWork={handleDeleteOutOfHoursWork}
          id={id}
          isUpdateTaskModalOpen={isUpdateTaskModalOpen}
          handleOpenUpdateTaskModal={handleOpenUpdateTaskModal}
        />
      </div>
    </div>
  );
};

export default Report;

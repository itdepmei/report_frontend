import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksFromReport } from "../redux/tasksSlice";
const GetTasksFromReportHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksFromReport(id));
  }, []);

  const { task, isLoading } = useSelector((state) => state.tasks);

  return [task, isLoading];
};

export default GetTasksFromReportHook;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReports } from "../redux/reportsSlice";

const GetAllReportsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  const { data, isLoading } = useSelector((state) => state.reports);


  return [data, isLoading];
};

export default GetAllReportsHook;




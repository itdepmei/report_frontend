import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneReport } from "../redux/reportsSlice";
const GetOneReportHook = (id) => {
  const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getOneReport(id));
   }, []);
 
   const { singleReport, isLoading } = useSelector((state) => state.reports);
 
 
   return [singleReport, isLoading];
}

export default GetOneReportHook

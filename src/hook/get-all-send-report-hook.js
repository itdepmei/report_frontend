import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReportsByDate, getSendReport } from '../redux/reportsSlice';

const GetAllSendReportHook = (selectedDepartment) => {
    const dispatch = useDispatch();
    useEffect(() => {
      console.log("Dispatching department:", selectedDepartment);

      dispatch(getReportsByDate({ date: new Date(), department: selectedDepartment }));
    }, [selectedDepartment]);
  
    const { reportsByDate, isLoading } = useSelector((state) => state.reports);
    console.log("hook",reportsByDate);
  
  
    return [reportsByDate, isLoading];
}

export default GetAllSendReportHook

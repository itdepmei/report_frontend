import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReportsByDate, getSendReport } from '../redux/reportsSlice';

const GetAllSendReportHook = (selectedDepartment) => {
    const dispatch = useDispatch();
    useEffect(() => {

      dispatch(getReportsByDate({ date: new Date(), department: selectedDepartment }));
    }, [selectedDepartment]);
  
    const { reportsByDate, isLoading } = useSelector((state) => state.reports);

  
  
    return [reportsByDate, isLoading];
}

export default GetAllSendReportHook

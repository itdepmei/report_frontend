import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSendReport } from '../redux/reportsSlice';

const GetAllSendReportHook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getSendReport());
    }, []);
  
    const { sendReport, isLoading } = useSelector((state) => state.reports);
  
  
    return [sendReport, isLoading];
}

export default GetAllSendReportHook

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLogs } from '../redux/logSlice';

const GetAllLog = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getLogs());
    }, []);
  
    const { logs, isLoading } = useSelector((state) => state.log);
  
  
    return [logs, isLoading];
}

export default GetAllLog

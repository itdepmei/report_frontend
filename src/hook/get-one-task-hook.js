import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOneTask } from '../redux/tasksSlice';

const GetOneTaskHook = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOneTask(id));
    }, []);
  
    const { singleTask, isLoading } = useSelector((state) => state.tasks);
  
  
    return [singleTask, isLoading];
}

export default GetOneTaskHook

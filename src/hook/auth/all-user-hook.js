import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/authSlice';

const AllUserHook = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllUsers());
    }, []);
    const { allUsers, isLoading } = useSelector((state) => state.auth);
  
    return [allUsers, isLoading];
}

export default AllUserHook

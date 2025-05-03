import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintFromReport } from "../redux/complaintsSlice";

const GetAllComplaintsHook = (id, refresh) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComplaintFromReport(id));
  }, [id, refresh]);

  const { complaint, isLoading } = useSelector((state) => state.complaints);



  return [complaint, isLoading];
};

export default GetAllComplaintsHook;

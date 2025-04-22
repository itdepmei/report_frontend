import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintFromReport } from "../redux/complaintsSlice";

const GetAllComplaintsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComplaintFromReport(id));
  }, []);

  const { complaint, isLoading } = useSelector((state) => state.complaints);

  return [complaint, isLoading];
};

export default GetAllComplaintsHook;

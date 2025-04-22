import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOutOfHoursWorkFromReport } from "../redux/outOfHoursWorkSlice";
const GetAllOutOfHoursWorkHook = (id) => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOutOfHoursWorkFromReport(id));
    }, []);
  
    const { outOfHoursWork, isLoading } = useSelector((state) => state.outOfHoursWork);
    console.log("outOfHoursWork", outOfHoursWork);
  
    return [outOfHoursWork, isLoading];
}

export default GetAllOutOfHoursWorkHook

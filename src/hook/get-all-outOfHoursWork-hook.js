import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOutOfHoursWorkFromReport } from "../redux/outOfHoursWorkSlice";
const GetAllOutOfHoursWorkHook = (id, refresh) => {

  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getOutOfHoursWorkFromReport(id));
    }, [refresh]);
  
    const { outOfHoursWork, isLoading } = useSelector((state) => state.outOfHoursWork);

    return [outOfHoursWork, isLoading];
}

export default GetAllOutOfHoursWorkHook

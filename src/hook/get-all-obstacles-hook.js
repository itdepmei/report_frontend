import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getObstaclesFromReport } from "../redux/obstaclesSlice";

const GetAllObstaclesHook = (id, refresh) => {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getObstaclesFromReport(id));
  }, [refresh]);

  const { obstacle, isLoading } = useSelector((state) => state.obstacles);

  return [obstacle, isLoading];
};

export default GetAllObstaclesHook;

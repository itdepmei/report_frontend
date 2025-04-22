import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getObstaclesFromReport } from "../redux/obstaclesSlice";

const GetAllObstaclesHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getObstaclesFromReport(id));
  }, []);

  const { obstacle, isLoading } = useSelector((state) => state.obstacles);

  return [obstacle, isLoading];
};

export default GetAllObstaclesHook;

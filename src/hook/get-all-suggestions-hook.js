import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestionsFromReport } from "../redux/suggestionsSlice";
const GetAllSuggestionsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuggestionsFromReport(id));
  }, []);

  const { suggestion, isLoading } = useSelector((state) => state.suggestions);

  return [suggestion, isLoading];
}

export default GetAllSuggestionsHook

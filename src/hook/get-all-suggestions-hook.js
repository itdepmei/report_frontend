import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestionsFromReport } from "../redux/suggestionsSlice";
const GetAllSuggestionsHook = (id, refresh) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSuggestionsFromReport(id));
  }, [refresh]);
  const { suggestion, isLoading } = useSelector((state) => state.suggestions);


  return [suggestion, isLoading];
}

export default GetAllSuggestionsHook




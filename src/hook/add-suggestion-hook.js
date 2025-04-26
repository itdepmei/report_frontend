import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSuggestion } from "../redux/suggestionsSlice";

const AddSuggestionHook = (reportId) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState("");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleAddSuggestion = () => {
    const newTask = {
      note: note,
      report: reportId,
    };

    dispatch(addSuggestion({ reportId, suggestionData: newTask }));
  };

  return [note, handleNoteChange, handleAddSuggestion];
};

export default AddSuggestionHook;

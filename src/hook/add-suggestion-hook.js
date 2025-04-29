import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSuggestion } from "../redux/suggestionsSlice";
import notify from "./useNotification";

const AddSuggestionHook = (reportId) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState("");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleAddSuggestion = () => {
    if (!note) {
      notify("يرجى كتابة الملاحظة قبل الإرسال", "error");
      return;
    }

    const newTask = {
      note: note,
      report: reportId,
    };

    dispatch(addSuggestion({ reportId, suggestionData: newTask }));
    notify("تم إرسال الملاحظة بنجاح", "success");
  };

  return [note, handleNoteChange, handleAddSuggestion];
};

export default AddSuggestionHook;

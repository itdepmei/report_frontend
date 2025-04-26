import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addComplaint } from '../redux/complaintsSlice';

const AddComplaintHook = (reportId) => {
    const dispatch = useDispatch();

    const [note, setNote] = useState("");
  
    const handleNoteChange = (event) => {
      setNote(event.target.value);
    };
  
    const handleAddComplaint = () => {
      const newTask = {
        note: note,
        report: reportId,
      };
  
      dispatch(addComplaint({ reportId, complaintData: newTask }));
    };
  
    return [note, handleNoteChange, handleAddComplaint];
}

export default AddComplaintHook

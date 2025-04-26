import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addOutOfHoursWork } from '../redux/outOfHoursWorkSlice';

const AddOutOfHoursWorkHook = (reportId) => {
    const dispatch = useDispatch();

    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [note, setNote] = useState("");
  
 
  
    const handleTimeStartChange = (event) => {
      setTimeStart(event.target.value);
    };
  
    const handleTimeEndChange = (event) => {
      setTimeEnd(event.target.value);
    };
  
    const handleNoteChange = (event) => {
      setNote(event.target.value);
    };
  
    const handleAddOutOfHoursWork = () => {
      const newTask = {
        timeStart: timeStart,
        timeEnd: timeEnd,
        note: note,
        report: reportId, 
      };
  
      dispatch(addOutOfHoursWork({ reportId, outOfHoursWorkData: newTask }));
    };
  
    return [note,timeStart, timeEnd, handleTimeStartChange, handleTimeEndChange, handleNoteChange, handleAddOutOfHoursWork];
}

export default AddOutOfHoursWorkHook

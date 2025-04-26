import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addObstacle } from '../redux/obstaclesSlice';

const AddObstacleHook = (reportId) => {
    const dispatch = useDispatch();

    const [note, setNote] = useState("");
  
    const handleNoteChange = (event) => {
      setNote(event.target.value);
    };
  
    const handleAddObstacle = () => {
      const newTask = {
        note: note,
        report: reportId,
      };
  
      dispatch(addObstacle({ reportId, obstacleData: newTask }));
    };
  
    return [note, handleNoteChange, handleAddObstacle];
}

export default AddObstacleHook

import { configureStore } from "@reduxjs/toolkit";
import { reportsReducer } from "./reportsSlice";
import { tasksReducer } from "./tasksSlice";
import { suggestionsReducer } from "./suggestionsSlice";
import { complaintsReducer } from "./complaintsSlice";
import { obstaclesReducer } from "./obstaclesSlice";
import { outOfHoursWorkReducer } from "./outOfHoursWorkSlice";
import { authReducer } from "./authSlice";
import { logReducer } from "./logSlice";

export const store = configureStore({
  reducer: {
    reports: reportsReducer,
    tasks: tasksReducer,
    suggestions: suggestionsReducer,
    complaints: complaintsReducer,
    obstacles: obstaclesReducer,
    outOfHoursWork: outOfHoursWorkReducer,
    auth:authReducer,
    log:logReducer
  },
});

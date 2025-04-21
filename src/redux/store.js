import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './postesSlice';
import { reportsReducer } from './reportsSlice';


export const store = configureStore({
    reducer: {
       posts: postsReducer,
       reports: reportsReducer
    },
});
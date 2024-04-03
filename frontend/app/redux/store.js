'use client';
import { configureStore } from '@reduxjs/toolkit';

import imageSlice from './imageSlice';
import predictedResultSlice from './predictedResultSlice';


const store = configureStore({
  reducer: {
    imageLoad: imageSlice,
    predResultLoad: predictedResultSlice,
  },
});


export default store;

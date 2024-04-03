'use client';
import { createSlice } from "@reduxjs/toolkit";


export const predictedResultSlice = createSlice({
    name: 'predResultSlice',
    initialState: {
        predResultData: null
    },
    reducers: {
        setPredResult: (state, action) => {
            state.predResultData = action.payload
        }
    }
});


export const { setPredResult } = predictedResultSlice.actions;

export default predictedResultSlice.reducer;
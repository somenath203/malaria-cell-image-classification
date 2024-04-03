'use client';
import { createSlice } from "@reduxjs/toolkit";


export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState: {
        imageData: null
    },
    reducers: {
        setImage: (state, action) => {
            state.imageData = action.payload
        }
    }
});


export const { setImage } = imageSlice.actions;

export default imageSlice.reducer;
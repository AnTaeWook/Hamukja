import { createSlice } from "@reduxjs/toolkit";


export const sortSlice = createSlice({
    name: 'sortingInfo',
    initialState: {
        sortingRool: 'order-by-time'
    },
    reducers: {
        setSortingRool: (state, action) => {
            state.sortingRool = action.payload;
        },
    },
})

export const { setSortingRool } = sortSlice.actions;

export default sortSlice.reducer;
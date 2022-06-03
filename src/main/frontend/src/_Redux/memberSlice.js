import { createSlice } from "@reduxjs/toolkit";



export const memberSlice = createSlice({
    name: 'memberInfo',
    initialState: {
        id: ''
    },
    reducers: {
        setMemberId: (state, action) => {
            state.id = action.payload;
        },
    },
})

export const { setMemberId } = memberSlice.actions;

export default memberSlice.reducer;
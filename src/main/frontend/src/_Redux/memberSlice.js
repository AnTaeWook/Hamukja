import { createSlice } from "@reduxjs/toolkit";

/**
 * memberSlice
 * 회원 메타데이타 관리를 위한 슬라이스
 * 
 * @author 태욱
 * @version 1.0
 */
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
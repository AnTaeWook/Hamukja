import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./memberSlice";

/**
 * configureStore
 * 상태 관리를 위한 저장소
 * 
 * @author 태욱
 * @version 1.0
 */
export default configureStore({
    reducer: {
        member: memberReducer,
    },
})
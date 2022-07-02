import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./memberSlice";
import sortReducer from "./sortSlice";



export default configureStore({
    reducer: {
        member: memberReducer,
        sorting: sortReducer
    },
})
import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./slices/favSlice"

export const store = configureStore({
    reducer : {
        fav : favReducer
    }
})
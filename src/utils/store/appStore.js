import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import movieReducer from "./slices/movieSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer
    }
});

export default appStore;
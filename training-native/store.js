import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import workoutReducer from "./reducers/workoutSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedExercises: [],
};
const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addExercise: (state, action) => {
      if (state.selectedExercises.includes(action.payload.id)) {
        state.selectedExercises = state.selectedExercises.filter(
          (e) => e !== action.payload.id
        );
      } else {
        state.selectedExercises.push(action.payload.id);
      }
    },
    removeAll: (state) => {
      state.selectedExercises = [];
    },
  },
});

export const { addExercise, removeAll } = workoutSlice.actions;

export const workoutSelector = (state) => state.workout;

export default workoutSlice.reducer;

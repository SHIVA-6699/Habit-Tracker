import { configureStore } from "@reduxjs/toolkit";
import habitsRducer from "./slice/habit-slice";
const store= configureStore({
  reducer: {
    habits:habitsRducer,
  },
});


export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;
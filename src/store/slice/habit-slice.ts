import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Habit {
  id: string;
  name: string;
  frequencey: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}
interface HabitState {
  habits: Habit[];
}
const initialState: HabitState = {
  habits: [],
};
const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequencey: "daily" | "weekly" }>
    ) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequencey: action.payload.frequencey,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    removeHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((hab) => hab.id == action.payload.id);
      if (habit) {
        const index = habit?.completedDates.indexOf(action.payload.date);
        console.log(index);
        
        if (index > -1) {
          habit?.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
  },
});

export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;

export default habitSlice.reducer;

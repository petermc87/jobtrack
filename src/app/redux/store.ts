import { configureStore } from "@reduxjs/toolkit";
// For declaring types for the useSelector hook. This will
import { TypedUseSelectorHook, useSelector } from "react-redux";
// Import the slice.
import signupReducer from "./features/signupSlice";

// Storing the new (reduced) state via the reducer.
export const store = configureStore({
  reducer: {
    signupReducer,
  },
});

// Getting the initial state.
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Declaring the type as a useSelector hook
// to avoud warnings elsewhere.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

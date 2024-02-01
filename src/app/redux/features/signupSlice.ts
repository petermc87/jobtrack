import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Value object
type initialStateType = {
  value: SignupState;
};

// Types for form active
type SignupState = {
  isOpen: boolean;
};

const initialState: initialStateType = {
  // The initial state of the form
  // will be false i.e. not open.
  value: {
    isOpen: false,
  },
};

export const signup = createSlice({
  name: "signup",
  initialState,

  // Reducer for changing the state.
  reducers: {
    openForm: (state, action: PayloadAction<boolean>) => {
      return {
        // Action is the boolean state passed from
        // the button in the NavBar, for example.
        value: {
          isOpen: action.payload,
        },
      };
    },
  },
});

export const { openForm } = signup.actions;

export default signup.reducer;

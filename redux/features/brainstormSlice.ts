import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BrainstormState {
  isActive: boolean;
  inputText: string;
}

const initialState: BrainstormState = {
  isActive: false,
  inputText: "",
};

const brainstormSlice = createSlice({
  name: "brainstorm",
  initialState,
  reducers: {
    toggleBrainstormMode: (state) => {
      state.isActive = !state.isActive;
    },
    updateInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },
    clearInputText: (state) => {
      state.inputText = "";
    },
  },
});

export const { toggleBrainstormMode, updateInputText, clearInputText } =
  brainstormSlice.actions;
export default brainstormSlice.reducer;

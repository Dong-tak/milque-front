import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
  selectedBoardId: string | null;
  isEditing: boolean;
}

const initialState: BoardState = {
  selectedBoardId: null,
  isEditing: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    selectBoard: (state, action: PayloadAction<string>) => {
      state.selectedBoardId = action.payload;
    },
    deselectBoard: (state) => {
      state.selectedBoardId = null;
    },
    toggleEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { selectBoard, deselectBoard, toggleEditing } = boardSlice.actions;
export default boardSlice.reducer;

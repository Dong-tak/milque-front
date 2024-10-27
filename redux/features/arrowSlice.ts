import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrowState {
  showSettings: boolean;
  textBoxVisibility: { [key: string]: boolean }; // 각 화살표별 텍스트 박스 표시 여부
  selectedArrowId: string | null;
  lastUpdate: {
    movedShapeId: string;
    newX: number;
    newY: number;
    shapes: any[];
  } | null;
}

const initialState: ArrowState = {
  showSettings: false,
  textBoxVisibility: {},
  selectedArrowId: null,
  lastUpdate: null,
};

const arrowSlice = createSlice({
  name: "arrow",
  initialState,
  reducers: {
    toggleSettings: (state, action: PayloadAction<string>) => {
      state.showSettings = !state.showSettings;
      state.selectedArrowId = action.payload;
    },
    closeSettings: (state) => {
      state.showSettings = false;
      state.selectedArrowId = null;
    },
    toggleTextBox: (state, action: PayloadAction<string>) => {
      const arrowId = action.payload;
      state.textBoxVisibility[arrowId] = !state.textBoxVisibility[arrowId];
    },
    updateArrowPositions: (
      state,
      action: PayloadAction<{
        movedShapeId: string;
        newX: number;
        newY: number;
        shapes: any[];
      }>,
    ) => {
      state.lastUpdate = action.payload;
    },
  },
});

export const {
  toggleSettings,
  closeSettings,
  toggleTextBox,
  updateArrowPositions,
} = arrowSlice.actions;
export default arrowSlice.reducer;

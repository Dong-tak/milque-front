import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RectangleShape,
  TextShape,
  ArrowShape,
  SectionShape,
} from "@/app/miro/utils/types";

type Shape = RectangleShape | TextShape | ArrowShape | SectionShape;

interface ShapesState {
  shapes: Shape[];
}

const initialState: ShapesState = {
  shapes: [],
};

const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    setShapes: (state, action: PayloadAction<Shape[]>) => {
      state.shapes = action.payload;
    },
    addShape: (state, action: PayloadAction<Shape>) => {
      state.shapes.push(action.payload);
    },
    updateShape: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Shape> }>,
    ) => {
      const { id, updates } = action.payload;
      const shape = state.shapes.find((s) => s.id === id);
      if (shape) {
        Object.assign(shape, updates);
      }
    },
    updateShapes: (state, action: PayloadAction<Shape[]>) => {
      state.shapes = action.payload;
    },
    updateArrowEndpoints: (
      state,
      action: PayloadAction<{
        arrowId: string;
        type: "from" | "to";
        shapeId: string;
      }>,
    ) => {
      const { arrowId, type, shapeId } = action.payload;
      const arrow = state.shapes.find((s) => s.id === arrowId);
      if (arrow && arrow.type === "arrow") {
        if (type === "from") {
          arrow.from = shapeId;
        } else {
          arrow.to = shapeId;
        }
      }
    },
  },
});

export const {
  setShapes,
  addShape,
  updateShape,
  updateShapes,
  updateArrowEndpoints,
} = shapesSlice.actions;
export default shapesSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Document {
  id: string;
  title?: string;
  parentId?: string;
  icon?: string;
  content?: string;
}

interface DocumentsState {
  items: Record<string, Document>;
}

const initialState: DocumentsState = {
  items: {},
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addDocument: (
      state,
      action: PayloadAction<{
        title: string;
        parentId?: string;
        content?: string;
      }>,
    ) => {
      const id = uuidv4();
      state.items[id] = {
        id,
        title: action.payload.title,
        parentId: action.payload.parentId,
        icon: "",
        content: action.payload.content,
      };
    },
    deleteDocument: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    updateDocument: (state, action: PayloadAction<Document>) => {
      state.items[action.payload.id] = action.payload;
    },
  },
});

export const { addDocument, deleteDocument, updateDocument } =
  documentsSlice.actions;
export default documentsSlice.reducer;

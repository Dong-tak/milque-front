import { createSlice } from "@reduxjs/toolkit";

// 초기 상태
interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true, // 기본값은 열림 상태
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;

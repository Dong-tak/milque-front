import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 뷰 타입 정의
type ViewType =
  | "profile"
  | "detailedsettings"
  | "socialaccount"
  | "notification"
  | "download"
  | "friend"
  | "scrap"
  | "group"
  | "site"
  | "default";

interface ViewState {
  currentView: ViewType;
}

// 초기 상태
const initialState: ViewState = {
  currentView: "profile", // 기본 뷰
};

// 슬라이스 생성
const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;

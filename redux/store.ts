// store.ts
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/postsDateSlice"; // 새로 분리한 postsSlice
import sidebarReducer from "./features/sidebarSlice"; // sidebarSlice 가져오기
import viewReducer from "./features/viewSlice"; // viewSlice 가져오기
import documentsReducer from "./features/documentsSlice";
import arrowReducer from "./features/arrowSlice"; // 새로 추가

// Redux 스토어 설정
const store = configureStore({
  reducer: {
    posts: postsReducer, // posts 상태
    sidebar: sidebarReducer, // sidebar 상태
    view: viewReducer, // view 상태
    documents: documentsReducer, // documents 상태
    arrow: arrowReducer, // 새로 추가한 reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

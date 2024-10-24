// features/postsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostFeed } from "@/lib/types";

// Posts 상태 인터페이스 정의
interface PostsState {
  groupedPosts: Record<string, PostFeed[]>;
}

// 초기 상태 정의
const initialState: PostsState = {
  groupedPosts: {},
};

// postsSlice 생성
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setGroupedPosts(state, action: PayloadAction<Record<string, PostFeed[]>>) {
      state.groupedPosts = action.payload;
    },
  },
});

// 액션과 리듀서 추출
export const { setGroupedPosts } = postsSlice.actions;
export default postsSlice.reducer;

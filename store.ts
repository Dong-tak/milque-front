import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostFeed } from "@/lib/types";

interface PostsState {
  groupedPosts: Record<string, PostFeed[]>;
}

const initialState: PostsState = {
  groupedPosts: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setGroupedPosts(state, action: PayloadAction<Record<string, PostFeed[]>>) {
      state.groupedPosts = action.payload;
    },
  },
});

export const { setGroupedPosts } = postsSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

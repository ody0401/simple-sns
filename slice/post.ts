import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { addPostAPI, addPostsAPI } from '../actions/post';

export interface Post {
  id: string;
  name: string;
  avatar: string;
  imageSrc: string[];
}

export interface PostState {
  posts: Post[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null;
  addPostsLoading: boolean;
  addPostsDone: boolean;
  addPostsError: string | null;
}

const initialState: PostState = {
  posts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addPostsLoading: false,
  addPostsDone: false,
  addPostsError: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    allRemovePost: (state) => {
      state.posts = [];
    },
  },
  extraReducers: {
    [addPostAPI.pending.type]: (state) => {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    [addPostAPI.fulfilled.type]: (state, action) => {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.posts.unshift(action.payload);
    },
    [addPostAPI.rejected.type]: (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.error.message as string | null;
    },
    [addPostsAPI.pending.type]: (state) => {
      state.addPostsLoading = true;
      state.addPostsDone = false;
      state.addPostsError = null;
    },
    [addPostsAPI.fulfilled.type]: (state, action) => {
      state.addPostsLoading = false;
      state.addPostsDone = true;
      state.posts = state.posts.concat(action.payload);
    },
    [addPostsAPI.rejected.type]: (state, action) => {
      state.addPostsLoading = false;
      state.addPostsError = action.error.message as string | null;
    },
  },
});

export const { removePost, allRemovePost } = postSlice.actions;
export default postSlice.reducer;

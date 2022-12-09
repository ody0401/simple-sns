import { createAsyncThunk } from '@reduxjs/toolkit';
import { addPost, addPosts } from '../api/post';

export const addPostAPI = createAsyncThunk('post/addPost', async (_, { rejectWithValue }) => {
  try {
    const response = await addPost();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addPostsAPI = createAsyncThunk('post/addPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await addPosts();
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

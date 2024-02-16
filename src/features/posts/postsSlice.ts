import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

import type { RootState } from '../../store';
import { getAllPosts } from '../../services/posts';

import { Post, IReaction, ApiPost } from '../../models/Post';

const INIT_REACTIONS: IReaction = {
  wow: 0,
  heart: 0,
  rocket: 0,
  thumbsUp: 0,
};

const INIT_STATE_API: ApiPost = {
  posts: [],
  status: 'idle',
  error: null,
};

/**
 * createAsyncThunk receives two params
 * the first one is a string used as prefix for the action type
 * the second is a payload creator callback
 */
export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
  return getAllPosts();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: INIT_STATE_API,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        //BECAUSE RTK USES IMMER IT ALLOW US TO DO IT LIKE THIS
        state.posts.push(action.payload);
      },
      prepare({
        title,
        body,
        userId,
      }: Omit<Post, 'id' | 'date' | 'reactions'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              wow: 0,
              heart: 0,
              rocket: 0,
              thumbsUp: 0,
            },
          },
        };
      },
    },
    addReaction(
      state,
      action: PayloadAction<{ id: string; reaction: keyof IReaction }>
    ) {
      const { id, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, _) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //adding date and reactions because they don't exist on response from api
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          (post.date = sub(new Date(), { minutes: min++ }).toISOString()),
            (post.reactions = INIT_REACTIONS);
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, _) => {
        state.status = 'failed';
        state.error = 'Something went wrong, please try again later';
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;

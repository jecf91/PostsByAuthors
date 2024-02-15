import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

import type { RootState } from '../../store';

import { Post, IReaction } from '../../models/Post';

const INIT_STATE: Post[] = [
  {
    id: '1',
    title: 'Lust for life',
    content: 'I am a passenger',
    userId: '1',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      wow: 0,
      heart: 0,
      rocket: 0,
      thumbsUp: 0,
    },
  },
  {
    id: '2',
    title: 'Heroes',
    content: 'We can be heroes, just for one day',
    userId: '2',
    date: sub(new Date(), { minutes: 20 }).toISOString(),
    reactions: {
      wow: 0,
      heart: 0,
      rocket: 0,
      thumbsUp: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: INIT_STATE,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        //BECAUSE RTK USES IMMER IT ALLOW US TO DO IT LIKE THIS
        state.push(action.payload);
      },
      prepare({
        title,
        content,
        userId,
      }: Omit<Post, 'id' | 'date' | 'reactions'>) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
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
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;

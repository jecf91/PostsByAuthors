import { configureStore } from '@reduxjs/toolkit';

import postsReducers from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducers,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from 'store';

import { User } from '../../models/User';

const INIT_STATE: User[] = [
  { id: '0', name: 'Lou Reed' },
  { id: '1', name: 'Iggy Pop' },
  { id: '2', name: 'David Bowie' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState: INIT_STATE,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;

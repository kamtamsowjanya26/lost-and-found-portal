// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // will store {id, name, email} or null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload; // set user
    },
    signOut(state) {
      state.user = null; // clear user
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;

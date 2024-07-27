import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { userExist, userNotExist } = userSlice.actions;

export default userSlice.reducer;

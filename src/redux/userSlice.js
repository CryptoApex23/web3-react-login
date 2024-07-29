import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  ethBalance: null,
  // Add other coin balances as needed
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    clearAddress: (state) => {
      state.address = null;
      state.ethBalance = null;
      // Clear other coin balances
    },
    setEthBalance: (state, action) => {
      state.ethBalance = action.payload;
    },
    // Add other coin balance setters as needed
  },
});

export const { setAddress, clearAddress, setEthBalance } = userSlice.actions;
export default userSlice.reducer;

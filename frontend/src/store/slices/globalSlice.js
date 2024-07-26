import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    admin: false,
    userId: "",
    email: "",
    password: "",
  },
  userName: "",
  loading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setBlockSkeleton: (state, action) => {
      state.blockSkeleton = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetGlobalState: (state) => {
      state.user = initialState.user;
      state.userName = initialState.userName;
      state.loading = initialState.loading;
    },
  },
});

export const {
  setUser,
  setUserName,
  setLoading,
  setBlockSkeleton,
} = globalSlice.actions;

export default globalSlice;

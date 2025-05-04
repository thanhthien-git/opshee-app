import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  isLoading: boolean;
};

const initialState: InitialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const isLoading = (state: RootState) => state.loadingReducer.isLoading;

export default loadingSlice.reducer;

import { ROLE } from "@/enums/role.enum";
import { IJwtPayload } from "@/interfaces/token-payload.interface";
import { StorageService } from "@/services/storage-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  userId: number;
  role: keyof typeof ROLE | null;
}

const currentUser: IJwtPayload = StorageService.verifyToken();

const initialState: AuthState = {
  isLogin: !!currentUser,
  userId: currentUser?.userId || null,
  role: currentUser?.role || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setState } = authSlice.actions;

export const getUserState = (state: AuthState) => {
  return state;
};

export default authSlice.reducer;

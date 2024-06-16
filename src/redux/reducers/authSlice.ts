import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignUpUserPayload
} from "./@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { GetUserInfoResponse } from "src/redux/sagas/@types";
type initialType ={
  isLoggedIn: boolean,
  userInfo: GetUserInfoResponse | null,
}
const initialState: initialType = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    getUserInfo: (_, __: PayloadAction<undefined>) => {},
    setUserInfo: (state, action: PayloadAction<GetUserInfoResponse | null>) => {
      state.userInfo = action.payload;
    },
    logoutUser: (_, __: PayloadAction<undefined>) => {},
  },
});
export const { signUpUser, activateUser, signInUser, setLoggedIn, getUserInfo, setUserInfo, logoutUser } = authSlice.actions;
export default authSlice.reducer;
export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getUserName: (state: RootState) => state.auth.userInfo,
};

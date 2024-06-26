import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { PayloadAction } from "@reduxjs/toolkit";
import {
  GetUserInfoResponse,
  SingInResponse,
  SingUpUserResponse,
} from "./@types";
import API from "../api";
import {
  activateUser,
  logoutUser,
  setLoggedIn,
  signInUser,
  signUpUser,
  getUserInfo,
  setUserInfo,
  resetPassword,
  newPassword
} from "../reducers/authSlice";
import {
  ActivateUserPayload,
  NewPasswordPayload,
  ResetPasswordData,
  ResetPasswordPayload,
  SignInUserPayload,
  SignUpUserPayload
} from "../reducers/@types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<SingUpUserResponse> = yield call(
    API.signUpUser,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error sign up user", problem);
  }
}
function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield call(
    API.activateUser,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error activate user", problem);
  }
}
function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const {
    ok,
    problem,
    data: responseData,
  }: ApiResponse<SingInResponse> = yield call(API.signInUser, data);
  if (ok && responseData) {
    localStorage.setItem(ACCESS_TOKEN_KEY, responseData?.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, responseData?.refresh);
    callback();
    yield put(setLoggedIn(true));
  } else {
    console.warn("Error activate user", problem);
  }
}
function* getUserInfoWorker() {
     const { ok, problem, data}: ApiResponse<GetUserInfoResponse> = yield callCheckingAuth(
      API.getUserInfo);
    if (ok && data) {
     yield put(setUserInfo(data));
    } else {
      console.warn("Error get information user", problem);
    }
}
function* resetPasswordWorker(action: PayloadAction<ResetPasswordPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield call(
    API.resetPassword,
    data
  );
  if (ok) {
   callback();
  } else {
    console.warn("Error resetting password", problem);
  }
}
function* newPasswordWorker(action: PayloadAction<NewPasswordPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield call(
    API.newPassword,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error setting new password", problem);
  }
}
function* logoutUserWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  yield put(setLoggedIn(false));
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserInfo, getUserInfoWorker),
    takeLatest(logoutUser, logoutUserWorker),
    takeLatest(resetPassword, resetPasswordWorker),
    takeLatest(newPassword, newPasswordWorker),
  ]);
}

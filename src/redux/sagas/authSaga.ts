import { takeLatest, all, call } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "../api";
import { activateUser, signUpUser } from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActivateUserPayload, SignUpUserPayload } from "../reducers/@types";
import { SingUpUserResponse } from "./@types";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<SingUpUserResponse> = yield call(API.signUpUser, data);
  if (ok) {
    callback();
  } else {
    console.warn("Error sign up user", problem);
  }
}
function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (ok) {
    callback();
  } else {
    console.warn("Error activate user", problem);
  }
}
export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
  ]);
}

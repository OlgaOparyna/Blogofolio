import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "../api";
import {
  getAllPosts,
  setAllPosts,
  getSinglePost,
  setSinglePost, setMyPosts, getMyPosts, setSearchedPosts, getSearchedPosts
} from "../reducers/postSlice";
import { AllPostsResponse } from "./@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../utils/@globalTypes";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";
import { GetAllPostsPayload } from "src/redux/reducers/@types";

function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  const { offset } = action.payload
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset
  );
  if (ok && data) {
    yield put(setAllPosts({ cardList: data.results, postsCount: data.count }));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<CardType> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (ok && data) {
    yield put(setSinglePost(data));
  } else {
    console.warn("Error getting single post", problem);
  }
}
function* getMyPostsWorker() {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield callCheckingAuth(
    API.getMyPosts
  );
  if (ok && data) {
    yield put(setMyPosts(data.results));
  } else {
    console.warn("Error getting my post", problem);
  }
}
function* getSearchedPostsWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    0,
    action.payload
  );
  if (ok && data) {
    yield put(setSearchedPosts(data.results));
  } else {
    console.warn("Error getting search posts", problem);
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
  ]);
}

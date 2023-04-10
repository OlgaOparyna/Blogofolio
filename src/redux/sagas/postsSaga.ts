import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "../api";
import {
  getAllPosts,
  setAllPosts,
  getSinglePost,
  setSinglePost,
  setMyPosts,
  getMyPosts,
  setSearchedPosts,
  getSearchedPosts,
  addNewPost, setAllPostsLoading
} from "../reducers/postSlice";
import { AllPostsResponse } from "./@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../utils/@globalTypes";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";
import { AddPostPayload, GetAllPostsPayload } from "src/redux/reducers/@types";

function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  yield put(setAllPostsLoading(true));
  const { offset, ordering } = action.payload;
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset,
    "",
    ordering
  );
  if (ok && data) {
    yield put(setAllPosts({ cardList: data.results, postsCount: data.count }));
  } else {
    console.warn("Error getting all posts", problem);
  }
  yield put(setAllPostsLoading(false));
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
  const { ok, data, problem }: ApiResponse<AllPostsResponse> =
    yield callCheckingAuth(API.getMyPosts);
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
function* addNewPostWorker(action: PayloadAction<AddPostPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield callCheckingAuth(
    API.addPost,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error adding post", problem);
  }
}
export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
    takeLatest(addNewPost, addNewPostWorker),
  ]);
}

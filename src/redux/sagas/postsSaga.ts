import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "../api";
import { getAllPosts, setAllPosts } from "../reducers/postSlice";

function* getAllPostsWorker() {
  const { ok, data, problem }: ApiResponse<any> = yield call(API.getPosts);
  if (ok) {
    yield put(setAllPosts(data.results));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

export default function* postsSaga() {
  yield all([takeLatest(getAllPosts, getAllPostsWorker)]);
}

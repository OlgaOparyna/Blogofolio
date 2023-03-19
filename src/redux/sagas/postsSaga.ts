import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "../api";
import { getAllPosts, setAllPosts } from "../reducers/postSlice";
import { AllPostsResponse } from "./@types";

function* getAllPostsWorker() {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(API.getPosts);
  if (ok && data) {
    yield put(setAllPosts(data.results));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

// function* getSinglePostWorker(action) {
//   const { ok, data, problem }: ApiResponse<any> = yield call(API.getSinglePost.action.payload);
//   if (ok) {
//     yield put(setSinglePost(data.results));
//   } else {
//     console.warn("Error getting single post", problem);
//   }
// }

export default function* postsSaga() {
  yield all([takeLatest(getAllPosts, getAllPostsWorker)]);
}

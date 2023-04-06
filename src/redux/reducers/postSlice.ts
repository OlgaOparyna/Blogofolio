import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CardListType, CardType } from "../../utils/@globalTypes";
import { AddPostPayload, GetAllPostsPayload, SetAllPostsPayload } from "src/redux/reducers/@types";

type initialType = {
  selectedPost: CardType | null;
  isVisibleSelectedModal: boolean;
  likePosts: CardListType;
  dislikePosts: CardListType;
  savedPosts: CardListType;
  postsList: CardListType;
  singlePost: CardType | null;
  myPosts: CardListType;
  searchedPosts: CardListType;
  searchValue: string;
  postsCount: number;
};
export enum LikeStatus {
  Like = "like",
  Dislike = "dislike",
}
const initialState: initialType = {
  selectedPost: null,
  isVisibleSelectedModal: false,
  likePosts: [],
  dislikePosts: [],
  savedPosts: [],
  postsList: [],
  singlePost: null,
  myPosts: [],
  searchedPosts: [],
  searchValue: "",
  postsCount: 0,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<GetAllPostsPayload>) => {},
    setAllPosts: (state, { payload: { postsCount, cardList } }: PayloadAction<SetAllPostsPayload>) => {
      state.postsList = cardList;
      state.postsCount = postsCount;
    },
    getMyPosts: (_, __: PayloadAction<undefined>) => {},
    setMyPosts: (state, action: PayloadAction<CardListType>) => {
      state.myPosts = action.payload;
    },
    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<CardType>) => {
      state.singlePost = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<CardType | null>) => {
      state.selectedPost = action.payload;
    },
    setPostVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisibleSelectedModal = action.payload;
    },
    setStatus(
      state,
      action: PayloadAction<{ status: LikeStatus; card: CardType }>
    ) {
      const { status, card } = action.payload;

      const likeIndex = state.likePosts.findIndex(
        (post) => post.id === card.id
      );
      const dislikeIndex = state.dislikePosts.findIndex(
        (post) => post.id === card.id
      );

      const isLike = status === LikeStatus.Like;

      const mainKey = isLike ? "likePosts" : "dislikePosts";
      const secondaryKey = isLike ? "dislikePosts" : "likePosts";
      const mainIndex = isLike ? likeIndex : dislikeIndex;
      const secondaryIndex = isLike ? dislikeIndex : likeIndex;

      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    getSearchedPosts: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchedPosts: (state, action: PayloadAction<CardListType>) => {
      state.searchedPosts = action.payload;
    },
    addNewPost: (_, __: PayloadAction<AddPostPayload>) => {},
    setSavedPosts: (state, action: PayloadAction<CardType>) => {
      const card = action.payload;
      const savedPostsIndex = state.savedPosts.findIndex(
        (post) => post.id === card.id
      );

      if (savedPostsIndex === -1) {
        state.savedPosts.push(action.payload);
      } else {
        state.savedPosts.splice(savedPostsIndex, 1);
      }
    },
  },
});
export const {
  setSelectedPost,
  setPostVisibility,
  setStatus,
  setSavedPosts,
  getAllPosts,
  setAllPosts,
  getSinglePost,
  setSinglePost,
  getMyPosts,
  setMyPosts,
  getSearchedPosts,
  setSearchedPosts,
  addNewPost,
} = postSlice.actions;
export default postSlice.reducer;
export const PostSelectors = {
  getSelectedPost: (state: RootState) => state.posts.selectedPost,
  getVisibleSelectedModal: (state: RootState) =>
    state.posts.isVisibleSelectedModal,
  getLikePosts: (state: RootState) => state.posts.likePosts,
  getDislikePosts: (state: RootState) => state.posts.dislikePosts,
  getSavedPosts: (state: RootState) => state.posts.savedPosts,
  getAllPosts: (state: RootState) => state.posts.postsList,
  getSinglePost: (state: RootState) => state.posts.singlePost,
  getMyPosts: (state: RootState) => state.posts.myPosts,
  getSearchedPosts: (state: RootState) => state.posts.searchedPosts,
  getSearchValue: (state: RootState) => state.posts.searchValue,
  getAllPostsCount: (state: RootState) => state.posts.postsCount,
};

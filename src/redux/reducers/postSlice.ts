import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CardType } from "../../components/Card";
import { RootState } from "../store";

type initialType = {
  selectedPost: CardType | null;
  isVisibleSelectedModal: boolean;
  likePosts: CardType[];
  dislikePosts: CardType[];
  savedPosts: CardType[];
  postsList: CardType[];
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
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<undefined>) => {},
    setAllPosts: (state, action: PayloadAction<CardType[]>) => {
      state.postsList = action.payload;
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
};

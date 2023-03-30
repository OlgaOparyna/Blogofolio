import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CardType } from "../../components/Card";
import { RootState } from "../store";

type initialType = {
  selectedPost: CardType | null;
  isVisibleSelectedModal: boolean;
  likePosts: CardType[];
  dislikePosts: CardType[];
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
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
  },
});
export const { setSelectedPost, setPostVisibility, setStatus } = postSlice.actions;
export default postSlice.reducer;
export const PostSelectors = {
  getSelectedPost: (state: RootState) => state.posts.selectedPost,
  getVisibleSelectedModal: (state: RootState) =>
    state.posts.isVisibleSelectedModal,
  getLikePosts: (state: RootState) => state.posts.likePosts,
  getDislikePosts: (state: RootState) => state.posts.dislikePosts,
};

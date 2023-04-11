import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import Title from "src/components/Title";
import {
  getSearchedPosts,
  PostSelectors,
} from "src/redux/reducers/postSlice";
import SearchCardList from "src/components/SearchCardList";
import Loader from "src/components/Loader";
import { PER_PAGE } from "src/utils/constants";

const Search = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const searchValue = useSelector(PostSelectors.getSearchValue);
  const cardList = useSelector(PostSelectors.getSearchedPosts);
  const postsCount = useSelector(PostSelectors.getSearchedPostsCount);

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE;
    dispatch(getSearchedPosts({ searchValue, isOverwrite: false, offset }));
  }, [page]);
  const onNextReached = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <Title title={searchValue} />
      <InfiniteScroll
        next={onNextReached}
        hasMore={cardList.length < postsCount}
        loader={<Loader />}
        dataLength={cardList.length}
        scrollThreshold={0.8}
        scrollableTarget="scrollableDiv"
      >
        <SearchCardList cardsList={cardList} />
      </InfiniteScroll>
    </div>
  );
};

export default Search;

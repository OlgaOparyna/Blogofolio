import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import classNames from "classnames";

import Title from "src/components/Title";
import Tabs from "src/components/Tabs";
import CardsList from "src/components/CardList";
import { TabsNames } from "src/components/Tabs/types";
import { getAllPosts, PostSelectors } from "src/redux/reducers/postSlice";
import { AuthSelectors } from "src/redux/reducers/authSlice";

import SelectedPostModal from "./SelectedPostModal";
import styles from "./Home.module.scss";
import { PER_PAGE } from "src/utils/constants";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import Loader from "src/components/Loader";

enum Order {
  Title = "title",
  Date = "date",
}
const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordering, setOrdering] = useState("");

  const dispatch = useDispatch();

  const postsList = useSelector(PostSelectors.getAllPosts);
  const likePostsList = useSelector(PostSelectors.getLikePosts);
  const myPostList = useSelector(PostSelectors.getMyPosts);
  const favouritesList = useSelector(PostSelectors.getSavedPosts);
  const postsCount = useSelector(PostSelectors.getAllPostsCount);
  const pagesCount = Math.ceil(postsCount / PER_PAGE);
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const isLoading = useSelector(PostSelectors.getAllPostsLoading);
  const onTabClick = (key: TabsNames) => () => {
    setActiveTab(key);
    setCurrentPage(1);
  };
  const getCurrentList = () => {
    switch (activeTab) {
      case TabsNames.POPULAR:
        return likePostsList;
      case TabsNames.MYPOSTS:
        return myPostList;
      case TabsNames.FAVOURITES:
        return favouritesList;
      case TabsNames.ALL:
      default:
        return postsList;
    }
  };
  useEffect(() => {
    const offset = PER_PAGE * (currentPage - 1);
    dispatch(getAllPosts({ offset, ordering }));
  }, [currentPage, ordering]);
  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };
  const onButtonOrderingClick = (order: Order) => () => {
    order === ordering ? setOrdering("") : setOrdering(order);
    setCurrentPage(1);
  };

  const TABS_LIST = useMemo(
    () => [
      {
        title: "All",
        disabled: false,
        key: TabsNames.ALL,
      },
      {
        title: "My Posts",
        disabled: !isLoggedIn,
        key: TabsNames.MYPOSTS,
      },
      {
        title: "Popular",
        disabled: false,
        key: TabsNames.POPULAR,
      },
      {
        title: "Favourites",
        disabled: false,
        key: TabsNames.FAVOURITES,
      },
    ],
    [isLoggedIn]
  );

  return (
    <div>
      <Title title={"Blog"} />
      <Tabs
        tabsListArray={TABS_LIST}
        activeTab={activeTab}
        onClick={onTabClick}
      />
      <div className={styles.orderingButtons}>
        <Button
          title={"Sort Date"}
          onClick={onButtonOrderingClick(Order.Date)}
          type={ButtonType.Secondary}
          className={classNames(styles.orderingButton, {
            [styles.activeButton]: ordering === Order.Date,
          })}
        />
        <Button
          title={"Sort Title"}
          onClick={onButtonOrderingClick(Order.Title)}
          type={ButtonType.Secondary}
          className={classNames(styles.orderingButton, {
            [styles.activeButton]: ordering === Order.Title,
          })}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CardsList cardsList={getCurrentList()} />
          <SelectedPostModal />
          {activeTab !== TabsNames.POPULAR &&
            activeTab !== TabsNames.FAVOURITES && (
              <ReactPaginate
                pageCount={pagesCount}
                onPageChange={onPageChange}
                containerClassName={styles.pagesContainer}
                pageClassName={styles.pageNumber}
                breakClassName={styles.pageNumber}
                breakLinkClassName={styles.linkPage}
                activeLinkClassName={styles.linkPage}
                pageLinkClassName={styles.linkPage}
                activeClassName={styles.activePageNumber}
                nextClassName={classNames(styles.arrowButton, {
                  [styles.blockedButton]: currentPage === pagesCount,
                })}
                previousClassName={classNames(styles.arrowButton, {
                  [styles.blockedButton]: currentPage === 1,
                })}
                previousLinkClassName={styles.linkPage}
                nextLinkClassName={styles.linkPage}
              />
            )}
        </>
      )}
    </div>
  );
};
export default Home;

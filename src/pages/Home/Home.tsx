import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardList";
import { TabsNames } from "../../components/Tabs/types";
import SelectedPostModal from "./SelectedPostModal";
import { getAllPosts, PostSelectors } from "../../redux/reducers/postSlice";
import { AuthSelectors } from "src/redux/reducers/authSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.ALL);
  const dispatch = useDispatch();
  const postsList = useSelector(PostSelectors.getAllPosts);
  const likePostsList = useSelector(PostSelectors.getLikePosts)
  const myPostList = useSelector(PostSelectors.getMyPosts)
  const favouritesList = useSelector(PostSelectors.getSavedPosts)
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const onTabClick = (key: TabsNames) => setActiveTab(key);
  const getCurrentList = ()=>{
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
  }
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

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
      <CardsList cardsList={getCurrentList()} />
      <SelectedPostModal />
    </div>
  );
};
export default Home;

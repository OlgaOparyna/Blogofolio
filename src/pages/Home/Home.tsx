import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardList";
import { TabsNames } from "../../components/Tabs/types";
import SelectedPostModal from "./SelectedPostModal";
import { getAllPosts, PostSelectors } from "../../redux/reducers/postSlice";

const TABS_LIST = [
  {
    title: "All",
    disabled: false,
    key: TabsNames.ALL,
  },
  {
    title: "My favorites",
    disabled: false,
    key: TabsNames.FAVORITES,
  },
  {
    title: "Popular",
    disabled: true,
    key: TabsNames.POPULAR,
  },
];
const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.ALL);
  const dispatch = useDispatch();
  const postsList = useSelector(PostSelectors.getAllPosts);
  const onTabClick = (key: TabsNames) => setActiveTab(key);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      <Title title={"Blog"} />
      <Tabs
        tabsListArray={TABS_LIST}
        activeTab={activeTab}
        onClick={onTabClick}
      />
      <CardsList cardsList={postsList} />
      <SelectedPostModal />
    </div>
  );
};
export default Home;

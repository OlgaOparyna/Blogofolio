import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import Button from "../../components/Button";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../assets/icons";

import styles from "./SelectedPost.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { getAllPosts, getSinglePost, PostSelectors } from "../../redux/reducers/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { ButtonType } from "../../utils/@globalTypes";
import { RoutesList } from "../Router";

const SelectedPost = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;

  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, []);
  const singlePost = useSelector(PostSelectors.getSinglePost);

  return singlePost ? (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: isDark,
      })}
    >
      <div className={styles.bread_crumbs}>
        <NavLink to={RoutesList.Home}
          className={classNames(styles.home, {
            [styles.darkHome]: isDark,
          })}
        >
          Home
        </NavLink>
        <div className={styles.line}>|</div>
        <div className={styles.post_number}>`Post {id}`</div>
      </div>
      <div className={styles.mainblock}>
        <div
          className={classNames(styles.title, {
            [styles.darkTitle]: isDark,
          })}
        >
          {singlePost?.title}
        </div>
        <img
          className={styles.image}
          src={singlePost?.image}
            alt={"post image"}
        />
        <p
          className={classNames(styles.text, {
            [styles.darkText]: isDark,
          })}
        >
          {singlePost?.text}
        </p>
      </div>
      <div className={styles.buttons}>
        <div className={styles.left_buttons}>
          <Button
            title={<LikeIcon />}
            onClick={() => {}}
            type={ButtonType.Secondary}
          />
          <Button
            title={<DislikeIcon />}
            onClick={() => {}}
            type={ButtonType.Secondary}
          />
        </div>
        <div>
          <Button
            title={
              <div className={styles.right_buttons}>
                <BookmarkIcon />
                <div>Add to favorites</div>
              </div>
            }
            onClick={() => {}}
            type={ButtonType.Secondary}
            className={styles.buttonAdd}
          />
        </div>
      </div>
    </div>
  ) : null;
};
export default SelectedPost;

import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./PagesContainer.module.scss";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import classNames from "classnames";
import Header from "./Header";

const PagesContainer = () => {
  const { theme } = useThemeContext();
  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: theme === Theme.Dark,
      })}
      id="scrollableDiv"
    >
      <div><Header/></div>
      <div className={styles.mainInfo}>
        <Outlet />
        <div className={styles.footer}>
          <div>©2022 Blogfolio</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default PagesContainer;

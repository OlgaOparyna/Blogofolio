import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Tabs.module.scss";
import { TabsNames, TabsProps } from "./types";
import { Theme, useThemeContext } from "../../context/Theme/Context";

const Tabs: FC<TabsProps> = ({ tabsListArray, activeTab, onClick }) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: theme === Theme.Dark,
      })}
    >
      {tabsListArray.map((tab) => {
        return (
          <div
            key={tab.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === tab.key,
              [styles.disabled]: tab.disabled,
            })}
            onClick={tab.disabled ? undefined : onClick(tab.key)}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;

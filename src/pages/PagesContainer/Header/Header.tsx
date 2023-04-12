import React, { useMemo, useState, KeyboardEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import User from "src/components/User";
import Button from "src/components/Button";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import BurgerButton from "src/components/Burger";
import { ButtonType } from "src/utils/@globalTypes";
import { SearchIcon, UserIcon } from "src/assets/icons";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";

import styles from "./Header.module.scss";
import { RoutesList } from "../../Router";
import { getSearchedPosts } from "src/redux/reducers/postSlice";
import Input from "src/components/Input";

const Header = () => {
  const [isOpened, setOpened] = useState(false);
  const [isInputOpened, setInputOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const userName = useSelector(AuthSelectors.getUserName);
  const onBurgerClick = () => setOpened(!isOpened);
  const onAuthButtonClick = () => {
    navigate(RoutesList.SignIn);
  };
  const onLogoutClick = () => {
    dispatch(logoutUser());
  };
  const navButtonsList = useMemo(
    () => [
      {
        title: "Home",
        key: RoutesList.Home,
      },
      ...(!isLoggedIn
        ? []
        : [
            {
              title: "Add Post",
              key: RoutesList.AddPost,
            },
          ]),
    ],
    [isLoggedIn]
  );
  const onClickSearchButton = () => {
    setInputOpened(!isInputOpened);
    if (isInputOpened) {
      dispatch(getSearchedPosts(searchValue));
      navigate(RoutesList.Search);
    }
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSearchButton();
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <BurgerButton isOpened={isOpened} onClick={onBurgerClick} />
          {isInputOpened && (
            <Input
              value={searchValue}
              onChange={setSearchValue}
              onKeyDown={onKeyDown}
              inputClassName={styles.input}
              placeholder="Search..."
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <Button
            title={<SearchIcon />}
            onClick={onClickSearchButton}
            type={ButtonType.Primary}
            className={styles.button}
          />
          <div className={styles.userName} onClick={onAuthButtonClick}>
            {isLoggedIn && userName ? (
              <User userName={userName.username} />
            ) : (
              <Button
                title={<UserIcon />}
                onClick={onAuthButtonClick}
                type={ButtonType.Primary}
                className={styles.authButton}
              />
            )}
          </div>
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div className={styles.actionsContainer}>
            {isLoggedIn && userName && <User userName={userName.username} />}
            {navButtonsList.map(({ key, title }) => {
              return (
                <NavLink
                  to={key}
                  key={key}
                  className={classNames(styles.navButton, {
                    [styles.activeNavButton]: location.pathname === key,
                  })}
                >
                  {title}
                </NavLink>
              );
            })}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              title={isLoggedIn ? "Log Out" : "Sign In"}
              onClick={isLoggedIn ? onLogoutClick : onAuthButtonClick}
              type={ButtonType.Secondary}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Header;

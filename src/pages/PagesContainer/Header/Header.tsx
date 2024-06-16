import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import User from "src/components/User";
import Button from "src/components/Button";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import BurgerButton from "src/components/Burger";
import { ButtonType } from "src/utils/@globalTypes";
import { UserIcon } from "src/assets/icons";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";

import styles from "./Header.module.scss";
import { RoutesList } from "../../Router";

const Header = () => {
  const [isOpened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const onBurgerClick = () => setOpened(!isOpened);
  const onAuthButtonClick = () => {
    navigate(RoutesList.SignIn);
  };
  const onLogoutClick = ()=>{
    dispatch(logoutUser())
  }
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
  return (
    <>
      <div className={styles.container}>
        <BurgerButton isOpened={isOpened} onClick={onBurgerClick} />
        {isLoggedIn ? (<User userName={"Artem Malkin"} />): (<Button title={<UserIcon/>} onClick={onAuthButtonClick} type={ButtonType.Primary}/>)}
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div className={styles.actionsContainer}>
            {isLoggedIn && <User userName={"Artem Malkin"} />}
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

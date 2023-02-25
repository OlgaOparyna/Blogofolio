import React, { useState } from "react";
import styles from "./Burger.module.scss";
import { CloseIcon, OpenedMenu } from "../../assets/icons";
import Button from "../Button";
import { ButtonType } from "../Button/Button";

const BurgerButton = () => {
  const [isOpened, setOpened] = useState(true);
  const onBurgerClick = () => setOpened(!isOpened);
  return (
    <Button
      title={isOpened ? <OpenedMenu /> : <CloseIcon />}
      onClick={onBurgerClick}
      type={ButtonType.Primary}
      className={styles.burgerButton}
    />
  );
};
export default BurgerButton;
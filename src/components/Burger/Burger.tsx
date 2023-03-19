import React, { useState } from "react";
import styles from "./Burger.module.scss";
import { CloseIcon, OpenedMenu } from "../../assets/icons";
import Button from "../Button";
import { ButtonType } from "../../utils/@globalTypes";

const BurgerButton = () => {
  const [isOpened, setOpened] = useState(false);
  const onBurgerClick = () => setOpened(!isOpened);
  return (
    <Button
      title={isOpened ? <CloseIcon />  : <OpenedMenu /> }
      onClick={onBurgerClick}
      type={ButtonType.Primary}
      className={styles.burgerButton}
    />
  );
};
export default BurgerButton;

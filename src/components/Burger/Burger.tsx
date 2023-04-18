import React, { FC, useState } from "react";
import styles from "./Burger.module.scss";
import { CloseIcon, OpenedMenu } from "../../assets/icons";
import Button from "../Button";
import { ButtonType } from "../../utils/@globalTypes";
import { BurgerProps } from "./types";

const BurgerButton: FC<BurgerProps> = ({ isOpened, onClick }) => {
  return (
    <Button
      title={isOpened ? <CloseIcon />  : <OpenedMenu /> }
      onClick={onClick}
      type={ButtonType.Primary}
      className={styles.burgerButton}
    />
  );
};
export default BurgerButton;

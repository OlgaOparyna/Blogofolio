import React from "react"
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./Page404.module.scss"
import {Theme, useThemeContext} from "../../context/Theme/Context";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
const Page404 = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate = useNavigate()
  const onBtnClick = ()=>{
    navigate (`/`)
  }

  return (
    <div className={styles.container}>
      <div className={classNames(styles.error, {
        [styles.darkText]: isDark
      })}>
        404
      </div>
      <div className={classNames(styles.text, {
        [styles.darkText]: isDark
      })}>
        PAGE NOT FOUND
      </div>
      <div
        className={styles.btnHome}
      >
        <Button
          title={"Back to home"}
          onClick={onBtnClick}
          type={ButtonType.Primary}
        />
      </div>
    </div>
  )
}

export default Page404;
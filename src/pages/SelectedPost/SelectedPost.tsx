import React from "react";
import Button from "../../components/Button";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../assets/icons";
import { ButtonType } from "../../components/Button/Button";
import styles from "./SelectedPost.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import classNames from "classnames";

const SelectedPost = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  return (
    <div className={classNames(styles.container, {
      [styles.darkContainer]: isDark,
    })}>
      <div className={styles.bread_crumbs}>
        <div className={classNames(styles.home, {
          [styles.darkHome]: isDark,
        })}
        >Home</div>
        <div className={styles.line}>|</div>
        <div className={styles.post_number}>Post 14278</div>
      </div>
      <div className={styles.mainblock}>
        <div className={classNames(styles.title, {
          [styles.darkTitle]: isDark,
        })}>
          Astronauts prep for new solar arrays on nearly seven-hour spacewalk
        </div>
        <img
          className={styles.image}
          src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
          alt=" "
        />
        <p className={classNames(styles.text, {
          [styles.darkText]: isDark,
        })}>
          Astronauts Kayla Barron and Raja Chari floated out of the
          International Space Station airlock for a spacewalk Tuesday,
          installing brackets and struts to support new solar arrays to upgrade
          the research lab’s power system on the same day that crewmate Mark
          Vande Hei marked his 341st day in orbit, a U.S. record for a single
          spaceflight.
          <br /> During the final days of Alice Neel’s blockbuster solo show at
          the Metropolitan Museum of Art this summer, the line into the
          exhibition spanned the length of the museum’s European paintings
          corridor, and the wait was over half an hour. Titled “People Come
          First,” the show featured more than 100 gritty cityscapes, domestic
          interiors, and stripped-down portraits of Neel’s neighbors, friends,
          and fellow artists in the largest-ever showing of her work in her
          hometown of New York City.
          <br />
          The stories tracked Hambling’s trailblazing career while focusing on
          her current and upcoming projects. The artist’s installation Relic
          (2021), produced alongside sound recordist Chris Watson, was recently
          on view at Snape Maltings in London. Meanwhile, this October,
          portraits by Hambling will be presented at the Italian gallery Thomas
          Brambilla. The artist’s “Wave Series” is also currently being
          exhibited in the group show “Summer Exhibition” at Marlborough London,
          which runs through September 10th.
          <br />
          The excitement surrounding this exhibition delighted longtime fans of
          the expressive painter while inspiring a legion of new devotees—a
          trend matched by Neel’s strengthening position in the art market,
          especially in the past year. In May, Neel’s 1966 canvas Dr. Finger’s
          Waiting Room roused a flurry of bids from the United States, Asia, and
          Europe at Christie’s New York, where it ultimately sold for just over
          $3 million, breaking both its high estimate and the artist’s auction
          record. Just hours earlier at Sotheby’s New York, Neel’s double
          portrait Henry and Sally Hope (1977), depicting an art historian and
          his wife, sold for just under $1.6 million, notching her third-highest
          auction result.
          <br />
          The demand for Maggi Hambling’s evocative portraits and exuberant
          depictions of seascapes and landscapes surged this past week, when the
          number of collectors inquiring on her work increased more than tenfold
          from the week before. The British artist, esteemed for her whirling,
          gestural paintings and bold public sculptures, has seen a consistent
          wave of interest in her work that has accelerated in the past few
          years. This recent uptick in interest is consistent with Hambling’s
          career trajectory, which has been punctuated by a flurry of public
          commissions, institutional recognition, and secondary-market demand.
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
  );
};
export default SelectedPost;

import React, { FC } from "react";
import { CardProps, CardSize } from "./types";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon, MoreIcon } from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  LikeStatus,
  PostSelectors,
  setPostVisibility,
  setSelectedPost,
  setStatus
} from "../../redux/reducers/postSlice";

const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image } = card;
  const { theme } = useThemeContext();
  const dispatch = useDispatch()
  const isVisible = useSelector(PostSelectors.getVisibleSelectedModal);
  const likePosts = useSelector(PostSelectors.getLikePosts);
  const dislikePosts = useSelector(PostSelectors.getDislikePosts);
  const likeIndex = likePosts.findIndex(
    (post) => post.id === card.id
  );
  const dislikeIndex = dislikePosts.findIndex(
    (post) => post.id === card.id
  );

  const isLarge = size === CardSize.Large
  const isMedium = size === CardSize.Medium
  const isSmall = size === CardSize.Small
  const isDark = theme === Theme.Dark;
  const onClickMore = ()=>{
    dispatch(setSelectedPost(card))
    dispatch(setPostVisibility(true))
  }
  const onStatusClick = (status: LikeStatus)=>()=> {
    dispatch(setStatus({status, card}))
  }
  return (
    <div
      className={classNames(styles.container, {
        [styles.mediumContainer]: isMedium,
        [styles.smallContainer]: isSmall,
        [styles.darkContainer]: isDark,
      })}
    >
      <div
        className={classNames(styles.infoContainer, {
          [styles.mediumInfoContainer]: isMedium,
          [styles.smallInfoContainer]: isSmall,
        })}
      >
        <div className={styles.mainInfoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.date}> {date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: !isLarge,
                [styles.darkTitle]: isDark,
              })}
            >
              {title}
            </div>
          </div>
          {size === CardSize.Large && <div className={styles.text}>{text}</div>}
        </div>
        <img
          src={image}
          alt=" "
          className={classNames(styles.image, {
            [styles.mediumImage]: isMedium,
            [styles.smallImage]: isSmall,
          })}
        />
      </div>
      <div className={styles.footer}>
        <div className={classNames(styles.iconContainer, {
          [styles.darkIconContainer]: isDark,
        })}>
          <div onClick={onStatusClick(LikeStatus.Like)}>
            <LikeIcon /> {likeIndex> -1 && 1}
          </div>
          <div onClick={onStatusClick(LikeStatus.Dislike)}>
            <DislikeIcon /> {dislikeIndex> -1 && 1}
          </div>
        </div>
        <div className={classNames(styles.iconContainer, {
          [styles.darkIconContainer]: isDark,
        })}>
          <div>
            <BookmarkIcon />
          </div>
          {!isVisible && <div onClick={onClickMore}>
            <MoreIcon />
          </div>}
        </div>
      </div>
    </div>
  );
};
export default Card;

import React from "react";
import style from "./Card.module.scss";
import Button from "../Button/Button";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import LinkBtn from "../Button/LinkBtn";
import { Link } from "react-router-dom";
function IndustryCard({ title, description, img, itemId }) {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);
  // console.log(visible);
  return (
    <Link to="/partners" className={style.card}>
      <div className={style.imgContainer}>
        <div className={style.image}>
          <img alt={title} src={img} className={style.img} />
        </div>
      </div>

      <div className={style.textContainer}>
        <h1 className={style.cardTitle}>{title}</h1>
        <p>{description}</p>
      </div>
      <div className={style.cardButtonContainer}>
        <LinkBtn to="/partners" className={`${style.industryCardBtn}`}>
          <span>Use cases</span>
          <RightArrow />
        </LinkBtn>
      </div>
    </Link>
  );
}

export default IndustryCard;

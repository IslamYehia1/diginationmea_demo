import React from "react";
import style from "./Card.module.scss";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import LinkBtnStyle from "../Button/LinkBtn.module.scss";
import { Link } from "react-router-dom";
function IndustryCard({ title, description, img, itemId }) {
  const visibility = React.useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);
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
      {/* <div className={style.cardButtonContainer}>
        <span
          to="/partners"
          className={`${LinkBtnStyle.linkBtn} ${style.industryCardBtn} `}
        >
          <span>Use cases</span>
          <RightArrow />
        </span>
      </div> */}
    </Link>
  );
}

export default IndustryCard;

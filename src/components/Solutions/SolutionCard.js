import style from "./Solutions.module.scss";
import { ReactComponent as Arrow } from "../../SVG/topRightArrow.svg";

function SolutionCard({ itemId, title, listItems, Icon }) {
  return (
    <div className={style.cardContainer}>
      <Arrow className={style.arrow} />
      <div className={style.cardWrapper}>
        <div className={style.cardHeading}>
          <Icon />
          <div className={style.cardTitle}>
            <h2 className={style.normalTitle}>{title}</h2>
            <h3 className={style.coloredTitle}>{title}</h3>
          </div>
        </div>
        <ul>
          {listItems.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default SolutionCard;

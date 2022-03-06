import style from "./Solutions.module.scss";
import { ReactComponent as Arrow } from "../../SVG/topRightArrow.svg";

function SolutionCard({ itemId }) {
  return (
    <div>
      <Arrow className={style.arrow} />
      <ul>
        <li>Low-Code Applications</li>
        <li>Custom Applications</li>
        <li>Communication-Enabled Business</li>
        <li>Enterprise Content Management</li>
        <li>Application Integration</li>
      </ul>
      <div className={style.cardTitle}>
        <h2 className={style.normalTitle}>Business Intelligence</h2>
        <h3 className={style.coloredTitle}>Business Intelligence</h3>
      </div>
    </div>
  );
}

export default SolutionCard;

import style from "./ProcessCircle.module.scss";
import { ReactComponent as ProcessCircle } from "./processCircle.svg";
import { ReactComponent as CircleArrow } from "./circleArrow.svg";
import { ReactComponent as Arrow } from "../../SVG/right-arrow.svg";
import LinkBtn from "../Button/LinkBtn";
function Process() {
  return (
    <div className={`${style.transformationProcess} transformationProcess`}>
      <div className={style.processCircleContainer}>
        <ProcessCircle className={style.processCircle} />
        <div className={style.onCircleContainer}>
          <span
            className={`${style.firstCircleArrowWrapper} ${style.circleArrowWrapper}`}
          >
            <CircleArrow className={style.circleArrow} />
          </span>
          <span className={`${style.firstLabel} ${style.label}`}>
            <span className={style.labelText}>
              <p>State Analysis</p>
            </span>
          </span>
          <span
            className={`${style.secondCircleArrowWrapper} ${style.circleArrowWrapper}`}
          >
            <CircleArrow className={style.circleArrow} />
          </span>
          <span className={`${style.secondLabel}  ${style.label}`}>
            <span className={style.labelText}>
              <p>Strategy Development</p>
            </span>
          </span>

          <span
            className={`${style.thirdCircleArrowWrapper} ${style.circleArrowWrapper}`}
          >
            <CircleArrow className={style.circleArrow} />
          </span>
          <span className={`${style.thirdLabel} ${style.label}`}>
            <span className={style.labelText}>
              <p>Implementation</p>
            </span>
          </span>
        </div>

        {/* <span
          className={`${style.leftCircleArrowWrapper} ${style.circleArrowWrapper}`}
        >
          <CircleArrow className={style.CircleArrow} />
        </span>
        <span className={`${style.fourthLabel} ${style.label}`}>
          <span className={style.labelText}>HI</span>
        </span> */}
      </div>
      <div className={style.circleContent}>
        <p className={style.contentText}>
          We help businesses integrate digital tech into different areas of
          their business.
        </p>
        <LinkBtn to="/services" className={style.servicesBtn}>
          <p>Services</p>
          <Arrow />
        </LinkBtn>
      </div>
    </div>
  );
}

export default Process;

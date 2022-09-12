import style from "./ProcessCircle.module.scss";
import { ReactComponent as ProcessCircle } from "./processCircle.svg";
import { ReactComponent as CircleArrow } from "./circleArrow.svg";
import { ReactComponent as Arrow } from "../../SVG/right-arrow.svg";

import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import LinkBtn from "../Button/LinkBtn";
import { useEffect, useRef } from "react";
function Process() {
  const tl = useRef(null);
  const hideTween = useRef(null);
  useEffect(() => {
    const circlesAndLabels = gsap.utils.toArray(`.${style.elementOnCircle}`);
    let circleLength = document
      .querySelector(".fullProcessCircle")
      .getTotalLength();
    setTimeout(() => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            id: "processCircleScrolltrigger",
            trigger: `.${style.processCircleContainer}`,
            start: "top center",
            end: "bottom top",
            toggleActions: "restart reset play pause",
            onLeaveBack: () => {
              hideTween.current = gsap.to(`.${style.transformationProcess}`, {
                opacity: 0,
                duration: 0.5,
              });
            },
            onEnter: () => {
              if (hideTween.current) hideTween.current.kill();
            },
          },
        })
        .to(`.${style.transformationProcess}`, { opacity: 1, duration: 1 });
      for (let i = 0; i < 6; i += 2) {
        tl.current
          .to(
            circlesAndLabels[i],
            {
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "<"
          )
          .to(".fullProcessCircle", {
            duration: 2,
            strokeDashoffset: `-=${circleLength / 3}`,
            ease: "power2.out",
          })
          .to(
            circlesAndLabels[i + 1],
            {
              opacity: 1,
              duration: 1,
            },
            "<+=50%"
          );
      }
    }, 100);
    return () => {
      tl.current.kill();
    };
  }, []);
  return (
    <div className={`${style.transformationProcess} transformationProcess`}>
      <div className={style.processCircleContainer}>
        <ProcessCircle className={style.processCircle} />
        <div className={style.onCircleContainer}>
          <span
            className={`${style.firstLabel} ${style.label} ${style.elementOnCircle}`}
          >
            <span className={style.labelText}>
              <p>State Analysis</p>
            </span>
          </span>
          <span
            className={`${style.firstCircleArrowWrapper} ${style.circleArrowWrapper}  ${style.elementOnCircle}`}
          >
            <CircleArrow className={style.circleArrow} />
          </span>

          <span
            className={`${style.secondLabel} ${style.label} ${style.elementOnCircle}`}
          >
            <span className={style.labelText}>
              <p>Strategy Development</p>
            </span>
          </span>
          <span
            className={`${style.secondCircleArrowWrapper} ${style.circleArrowWrapper} ${style.elementOnCircle}`}
          >
            <CircleArrow className={style.circleArrow} />
          </span>

          <span
            className={`${style.thirdLabel} ${style.label} ${style.elementOnCircle}`}
          >
            <span className={style.labelText}>
              <p>Implementation</p>
            </span>
          </span>
          <span
            className={`${style.thirdCircleArrowWrapper} ${style.circleArrowWrapper} ${style.elementOnCircle}`}
          >
            <CircleArrow className={style.circleArrow} />
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
          <span>Services</span>
          <Arrow />
        </LinkBtn>
      </div>
    </div>
  );
}

export default Process;

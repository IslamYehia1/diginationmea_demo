import style from "./Solutions.module.scss";
import { ReactComponent as Arrow } from "../../SVG/topRightArrow.svg";
import { useEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";

function SolutionCard({ itemId, className, title, listItems, Icon }) {
  const scaleUpTl = useRef();
  const cardRef = useRef();
  const listRef = useRef();
  useEffect(() => {
    const q = gsap.utils.selector(cardRef.current);
    scaleUpTl.current = gsap
      .timeline({ paused: true })
      // .to(q(`.${style.normalTitle}`), {
      //   y: -34,
      //   duration: 0.4,
      // })
      .to(cardRef.current, {
        scale: 1.05,
      })
      .fromTo(
        q(`.${style.cardHeading}`),
        { top: "20%", duration: 1.5 },
        {
          top: "10%",
        },
        "<"
      )
      .to(
        q("ul"),
        {
          opacity: 1,
          duration: 0.3,
        },
        "<"
      );

    // .to(
    //   q(`.${style.coloredTitle}`),
    //   {
    //     y: -45,
    //     duration: 0.4,
    //   },
    //   "-=0.4"
    // )
    // .to(
    //   q(`.${style.cardHeading} svg`),
    //   {
    //     color: "#00b295",
    //     // width: "2.5rem",
    //   },
    //   "<"
    // );
  }, []);
  return (
    <div
      className={`${style.cardContainer} ${className}`}
      ref={cardRef}
      onMouseEnter={() => {
        if (scaleUpTl.current) scaleUpTl.current.restart();
      }}
      onMouseLeave={() => {
        if (scaleUpTl.current) scaleUpTl.current.reverse();
      }}
    >
      {/* <Arrow className={style.arrow} /> */}
      <div className={style.cardWrapper}>
        <div className={style.cardHeading}>
          <Icon alt={`${title} illustration`} />
          <div className={style.cardTitle}>
            <h2 className={style.normalTitle}>{title}</h2>
          </div>
        </div>
        <ul ref={listRef}>
          {listItems.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default SolutionCard;

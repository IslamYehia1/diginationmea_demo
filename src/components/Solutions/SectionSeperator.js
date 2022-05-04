import style from "./SectionSeperator.module.scss";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
function SectionSeperator({
  SectionImg,
  Icon,
  imgScrollTarget,
  isHomeMounted,
}) {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!isHomeMounted) return;
    // const array = gsap.utils.toArray(".revealAnimationHeader");
    // array.forEach((header) => {
    const q = gsap.utils.selector(sectionRef.current);
    gsap.from(q(`.${style.textLine} span`), {
      scrollTrigger: {
        trigger: q(`.${style.revealAnimationHeader}`),
        start: "top+=40% bottom",
        toggleActions: "play none play reset",
      },
      duration: 1.8,
      y: "150",
      ease: "power4.out",
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
    });
    // });
  }, [isHomeMounted]);
  return (
    <div ref={sectionRef} className={style.sectionHeading}>
      <div className={style.headingText}>
        <h1 className={style.revealAnimationHeader}>
          <span className={style.textLine}>
            <span className="">OUR IT</span>
          </span>
          <span
            data-scroll
            data-scroll-speed="0.5"
            // data-target={`.${style.section}`}
            className={style.sectionIcon}
          >
            {" "}
            <Icon />
          </span>{" "}
          <span className={style.textLine}>
            <span className="">SOLUTIONS</span>
          </span>
        </h1>
      </div>
      <div className={style.headingImg}>
        <img
          src={SectionImg}
          data-scroll
          data-scroll-speed="-1.5"
          data-target={imgScrollTarget}
        />
      </div>
    </div>
  );
}

export default SectionSeperator;

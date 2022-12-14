import style from "./SectionSeperator.module.scss";
import { useEffect, useState, useRef } from "react";
import LinkBtn from "../Button/LinkBtn";
import gsap from "gsap";

function SectionSeperator({
  SectionImg,
  Icon,
  imgScrollTarget,
  isHomeMounted,
  firstLine,
  secondLine,
  linkToSection,
}) {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!isHomeMounted) return;
    // const array = gsap.utils.toArray(".revealAnimationHeader");
    // array.forEach((header) => {
    const q = gsap.utils.selector(sectionRef.current);
    const tl = gsap.from(q(`.${style.textLine} span`), {
      scrollTrigger: {
        id: `revealAnimation`,
        trigger: q(`.${style.revealAnimationHeader}`),
        start: "top+=5% bottom",
        endTrigger: `.${style.revealAnimationHeader}`,
        toggleActions: "play none play reset",
      },
      duration: 1.8,
      y: "200",
      ease: "power4.out",
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
    });
    return () => {
      if (tl) tl.kill();
    };
    // });
  }, [isHomeMounted]);
  return (
    <div ref={sectionRef} className={style.sectionHeading}>
      <div className={style.headingText}>
        <h1 className={style.revealAnimationHeader}>
          <span className={style.textLine}>
            <span className="">{firstLine}</span>
          </span>
          <span
            data-scroll
            data-scroll-speed="0.5"
            data-target={`.homePage`}
            className={style.sectionIcon}
          >
            {" "}
            <Icon />
          </span>{" "}
          <span className={style.textLine}>
            <span className="">{secondLine}</span>
          </span>
        </h1>
        <LinkBtn to="/services" className={style.btn}>
          <span>{linkToSection}</span>
        </LinkBtn>
      </div>
      <div className={style.headingImg}>
        <img
          className={style.img}
          src={SectionImg}
          alt={firstLine}
          data-scroll={true}
          data-scroll-speed="-1.5"
          data-target={imgScrollTarget}
        />
      </div>
    </div>
  );
}

export default SectionSeperator;

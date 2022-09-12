import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import style from "./RotatingSlider.module.scss";

function SliderTransitions({ nextSection, children }) {
  const [currentSection, setCurrentSection] = useState(0);
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const rotatingTl = useRef(null);
  const sections = useRef(null);

  useEffect(() => {
    // Essentials
    sections.current = gsap.utils.toArray(`.${style.storySection}`);
    gsap
      .timeline()
      .set(sections.current[0], {
        visibility: "visible",
      })
      .set(`.${style.clockSVG}`, { rotate: -90 })
      //Each box has over 100vw height so we need to center them
      .set(leftBoxRef.current, {
        translateY: "-50%",
      })
      .set(rightBoxRef.current, {
        translateY: "-50%",
      });
  }, []);
  useEffect(() => {
    const q = gsap.utils.selector(sections.current[currentSection]);
    const imgScaleTween = gsap.fromTo(
      q("img"),
      {
        scale: 1,
      },
      {
        scale: 1.1,
        duration: 5,
      }
    );
    return () => {
      imgScaleTween.kill();
    };
  }, [currentSection]);
  useEffect(() => {
    if (currentSection == nextSection) return;
    if (rotatingTl.current && rotatingTl.current.isActive()) return;
    const isBackwards = nextSection < currentSection;
    const isCurrentOdd = sections.current[currentSection].classList.contains(
      `${style.odd}`
    );
    const isNextOdd = sections.current[nextSection].classList.contains(
      `${style.odd}`
    );
    const currentSectionColor = window
      .getComputedStyle(sections.current[currentSection], null)
      .getPropertyValue("background");
    const nextSectionColor = window
      .getComputedStyle(sections.current[nextSection], null)
      .getPropertyValue("background");

    rotatingTl.current = gsap.timeline({ paused: true });
    if (!isCurrentOdd) {
      if (!isNextOdd)
        sections.current[nextSection].classList.add(`${style.odd}`);
      rotatingTl.current
        .set(rightBoxRef.current, {
          autoAlpha: 0,
          zIndex: 2,
          rotation: -180,
          transformOrigin: "left center",
          background: currentSectionColor,
        })
        .to(rightBoxRef.current, { autoAlpha: 1 })
        .set(leftBoxRef.current, {
          autoAlpha: 1,
          zIndex: 1,
          background: nextSectionColor,
        })
        .to(leftBoxRef.current, {
          rotation: !isBackwards ? "+=180" : "-=180",
          transformOrigin: "right center",
          ease: "power4.in",
        })
        .set(sections.current[nextSection], {
          visibility: "visible",
        })
        .set(sections.current[currentSection], { visibility: "hidden" })
        .set(leftBoxRef.current, { zIndex: 2 })
        .set(rightBoxRef.current, { zIndex: 1 })
        .to(rightBoxRef.current, {
          rotation: !isBackwards ? "+=180" : "-=180",
          transformOrigin: "left center",
          ease: "power4.out",
        });
    } else {
      if (isCurrentOdd)
        sections.current[nextSection].classList.remove(`${style.odd}`);
      rotatingTl.current
        .set(leftBoxRef.current, {
          rotation: 180,
          transformOrigin: "right center",
          zIndex: 2,
          background: currentSectionColor,
        })
        .to(leftBoxRef.current, {
          autoAlpha: 1,
        })
        .set(rightBoxRef.current, {
          zIndex: 1,
          background: nextSectionColor,
          autoAlpha: 1,
        })
        .to(rightBoxRef.current, {
          rotation: !isBackwards ? "+=180" : "-=180",
          transformOrigin: "left center",
          ease: "power4.in",
        })
        .set(rightBoxRef.current, { zIndex: 2 })
        .set(leftBoxRef.current, { zIndex: 1 })
        .set(sections.current[nextSection], {
          visibility: "visible",
        })
        .set(sections.current[currentSection], { visibility: "hidden" })
        .to(leftBoxRef.current, {
          rotation: !isBackwards ? "+=180" : "-=180",
          transformOrigin: "right center",
          ease: "power4.out",
        });
    }
    rotatingTl.current
      .set(rightBoxRef.current, {
        autoAlpha: 0,
      })
      .set(leftBoxRef.current, { autoAlpha: 0 });
    rotatingTl.current.play();
    setCurrentSection(nextSection);
  }, [nextSection]);
  return (
    <>
      <div className={style.boxesContainer}>
        <div className={`${style.box} ${style.leftBox}`} ref={leftBoxRef}></div>
        <div
          className={`${style.box} ${style.rightBox}`}
          ref={rightBoxRef}
        ></div>
      </div>
      {children}
    </>
  );
}

export default SliderTransitions;

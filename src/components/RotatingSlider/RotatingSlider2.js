import style from "./RotatingSlider.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ReactComponent as Loader } from "./circle.svg";
import PhaseTitle from "./SectionsTitles";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SliderSections from "./SliderSections";
gsap.registerPlugin(ScrollTrigger);
function TransformationStory({ onLoad }) {
  const wrapperRef = useRef(null);
  const leftTransitionRef = useRef(null);
  const rightTransitionRef = useRef(null);
  const mainTimeline = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const DELAY = 4;
  // On load is called after the first video is loaded
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);
  useEffect(() => {
    const sections = gsap.utils.toArray(`.${style.storySection}`);
    const activeCircles = gsap.utils.toArray(`.clock__dial__hour__circle`);
    mainTimeline.current = gsap.timeline({
      repeat: -1,
      paused: true,
      repeatDelay: DELAY,
    });
    // mainTimeline.current.timeScale(0.7);
    gsap.set(rightTransitionRef.current, {
      rotation: -180,
    });
    gsap.set(sections[0], {
      visibility: "visible",
    });
    const circleLength = document
      .querySelector(`.clock__dial__default`)
      .getTotalLength();
    sections.forEach((section, index) => {
      const q = gsap.utils.selector(section);
      const tl = gsap.timeline();
      tl.to(activeCircles[index], {
        opacity: 1,
        "fill-opacity": 1,
        scale: 1.3,
      }).to(".clock__dial__progress", {
        strokeDashoffset: `-=${circleLength / sections.length}`,
        duration: 3,
      });
      if (index % 2 === 0) {
        tl.set(rightTransitionRef.current, {
          autoAlpha: 0,
          zIndex: 2,
          rotation: -180,
          background: window
            .getComputedStyle(section, null)
            .getPropertyValue("background"),
        })
          .to(rightTransitionRef.current, { autoAlpha: 1 })
          .set(leftTransitionRef.current, {
            autoAlpha: 1,
            zIndex: 1,
            background: window
              .getComputedStyle(sections[(index + 1) % sections.length], null)
              .getPropertyValue("background"),
          })
          .to(leftTransitionRef.current, {
            rotation: "+=180",
            transformOrigin: "right center",
            ease: "power4.in",
          })
          .set(sections[(index + 1) % sections.length], {
            visibility: "visible",
          })
          .set(section, { visibility: "hidden" })
          .set(leftTransitionRef.current, { zIndex: 2 })
          .set(rightTransitionRef.current, { zIndex: 1 })
          .to(rightTransitionRef.current, {
            rotation: "+=180",
            transformOrigin: "left center",
            ease: "power4.out",
          })
          .add(() => {
            setCurrentIndex((index + 1) % sections.length);
          })
          .set(rightTransitionRef.current, { autoAlpha: 0 })
          .to(leftTransitionRef.current, { autoAlpha: 0 });
      } else if (index % 2 !== 0) {
        tl.set(leftTransitionRef.current, {
          zIndex: 2,
          background: window
            .getComputedStyle(section, null)
            .getPropertyValue("background"),
        })
          .to(leftTransitionRef.current, {
            autoAlpha: 1,
          })
          .set(rightTransitionRef.current, {
            zIndex: 1,
            background: window
              .getComputedStyle(sections[(index + 1) % sections.length], null)
              .getPropertyValue("background"),
            autoAlpha: 1,
          })
          .to(rightTransitionRef.current, {
            rotation: "+=180",
            transformOrigin: "left center",
            ease: "power4.in",
          })
          .set(rightTransitionRef.current, { zIndex: 2 })
          .set(leftTransitionRef.current, { zIndex: 1 })
          .set(sections[(index + 1) % sections.length], {
            visibility: "visible",
          })
          .set(section, { visibility: "hidden" })
          .to(leftTransitionRef.current, {
            rotation: "+=180",
            transformOrigin: "right center",
            ease: "power4.out",
          })
          .add(() => {
            setCurrentIndex((index + 1) % sections.length);
          })
          .set(leftTransitionRef.current, { autoAlpha: 0 })
          .to(rightTransitionRef.current, { autoAlpha: 0 });
      }
      mainTimeline.current.add(tl, index * DELAY);
      activeCircles[index].addEventListener("click", () => {
        mainTimeline.current.seek(index * DELAY);
      });
    });
    mainTimeline.current
      .to(
        ".clock__dial__hour__circle",
        {
          scale: 1,
          // opacity: 1,
          "fill-opacity": 0,
          stagger: {
            each: 0.5,
            from: "end",
          },
        },
        "<+=90%"
      )
      .to(
        ".clock__dial__progress",
        {
          strokeDashoffset: circleLength,
          duration: 2,
        },
        "<"
      );
    // mainTimeline.current.timeScale(4);
    mainTimeline.current.progress(0.7).play();
  }, []);
  useEffect(() => {
    // if (!isHomeMounted) return;
    const q = gsap.utils.selector(wrapperRef);
    gsap
      .timeline({})
      .from(
        q(`.${style.textLine} span`),
        {
          duration: 1,
          y: "150",
          ease: "power4.out",
          skewY: 7,
          stagger: {
            amount: 0.3,
          },
        }
        // "<"
      )
      .from(
        ".clockSVG",
        {
          duration: 1,
          opacity: 0,
          scale: 0.1,
        },
        // {
        //   scale: 1,
        // }
        "<+=50%"
      )
      .to(".phaseHeading", {
        autoAlpha: 1,
      });

    return () => {
      // ScrollTrigger.getById("storyTrigger").kill();
      // ScrollTrigger.getById("storyTrigger2").kill();
    };
  }, []);

  return (
    <div id="homePageSlider">
      <div className={style.transformationStoryWrapper}>
        <div className={style.transformationStory}>
          <Loader className={style.clockSVG} />
          <PhaseTitle
            currentIndex={currentIndex}
            className={style.phaseHeading}
          />
          <div className={style.wrapper} ref={wrapperRef}>
            <div className={style.boxesContainer}>
              <div
                className={`${style.box} ${style.leftTransition}`}
                ref={leftTransitionRef}
              ></div>
              <div
                className={`${style.box} ${style.rightTransition}`}
                ref={rightTransitionRef}
              ></div>
            </div>
            <SliderSections onLoad={onLoad} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformationStory;

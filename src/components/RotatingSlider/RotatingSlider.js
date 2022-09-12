import style from "./RotatingSlider.module.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ReactComponent as Loader } from "./circle.svg";
import SectionsTitles from "./SectionsTitles";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SliderSections from "./SliderSections";
import SliderTransitions from "./SliderTransitions";
gsap.registerPlugin(ScrollTrigger);
// onLoad is called after the first video is loaded to play the page transition
function TransformationStory({ onLoad }) {
  const [nextSection, setNextSection] = useState(0);
  const mainTimeline = useRef(null); //Clock animation that controls nextSection state
  const DELAY = 4; //The gap between rotations

  useEffect(() => {
    //Animation once the page is loaded
    gsap.timeline().from(`.${style.clockSVG}`, {
      duration: 1,
      opacity: 0,
      scale: 0.5,
    });
    mainTimeline.current = gsap.timeline({
      paused: true,
      repeat: -1,
      repeatDelay: 2,
    });
    /*
      The slider circle animation that controls the state nextSection
      When nextSection changes an effect will fire and play the rotating
      Slider animation 
    */
    const tinyCircles = gsap.utils.toArray(`.clock__dial__hour__circle`);
    const biggerCircles = gsap.utils.toArray(`.clock__dial__hour`);
    const circleLength = document
      .querySelector(`.clock__dial__default`)
      .getTotalLength();
    biggerCircles.forEach((circle, index) => {
      if (index == tinyCircles.length) return;
      const tl = gsap.timeline({});
      tl.to(tinyCircles[index], {
        opacity: 1,
        "fill-opacity": 1,
        scale: 1.3,
        duration: 0.5,
      })
        .to(
          ".clock__dial__progress",
          {
            strokeDashoffset: `-=${circleLength / 6}`,
            duration: 4,
            ease: "linear",
          },
          "<"
        )
        .to(
          tinyCircles[index],
          {
            opacity: 1,
            "fill-opacity": 1,
            scale: 0.8,
            duration: 0.5,
          },
          ">-=0.7"
        )
        .add(() => {
          setNextSection((nextSection) => (nextSection + 1) % 6);
        });
      mainTimeline.current.add(tl, index * tl.totalDuration());
      circle.addEventListener("click", () => {
        mainTimeline.current.seek(index * tl.totalDuration());
        setNextSection(index);
      });
      const scaleLittleCircle = gsap.to(tinyCircles[index], {
        paused: true,
        scale: 1.2,
        duration: 0.3,
      });
      // Scale the little circle up unless the gsap tween's already using it
      circle.addEventListener("mouseenter", () => {
        console.log("ENTERED");
        return tl.isActive() ? null : scaleLittleCircle.restart();
      });
      circle.addEventListener("mouseleave", () =>
        tl.isActive() ? null : scaleLittleCircle.reverse()
      );
    });
    return () => {
      mainTimeline.current.kill();
    };
  }, []);

  return (
    <div id="homePageSlider">
      <div className={style.sliderWrapper}>
        <div className={style.slider}>
          <Loader className={style.clockSVG} />
          <SectionsTitles
            currentIndex={nextSection}
            className={style.phaseHeading}
          />
          <div className={style.wrapper}>
            <SliderTransitions nextSection={nextSection}>
              <SliderSections
                onLoad={() => {
                  onLoad();
                  mainTimeline.current.play();
                }}
              />
            </SliderTransitions>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformationStory;

import style from "./TransformationStory.scss";
import { gsap } from "gsap";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import img1 from "../Images/Slide 1.png";
import img2 from "../Images/Slide 2.png";
import img3 from "../Images/Slide 3.png";
import img4 from "../Images/Slide 4.png";
import img5 from "../Images/Slide 5.png";
import { ReactComponent as Loader } from "./clock.svg";
import PhaseTitle from "./PhaseTitle";
import Section from "./Section";
import { MyContext } from "../../App";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
function TransformationStory({ isHomeMounted }) {
  const wrapperRef = useRef(null);
  const [isImageBehind, setIsImageBehind] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { scrollRef } = useContext(MyContext);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 999;
  function update() {
    setCurrentSectionIndex((prevCount) => (prevCount + 1) % 5);
    setIsEven((isEven) => !isEven);
  }

  const setImageBehind = useCallback(() => {
    setIsImageBehind(true);
  });
  const rightTransitionRef = useRef();
  const leftTransitionRef = useRef();
  const storyTL = useRef();
  const clockTL = useRef();

  // const colors = ["#1c8a55", "#D7C9AA", "#0066A5", , "#162521"];
  const colors = ["colors0", "colors1", "colors2", "colors3", "colors4"];
  const [currLeftColor, setCurrLeftColor] = useState();
  const [currRightColor, setCurrRightColor] = useState();
  const prevColor = useRef();
  const newColor = useRef();
  const [isEven, setIsEven] = useState(true);
  const [isStory, setIsStory] = useState(false);
  const transparent = "transparent";
  function setBackground(panel, colorItem) {
    if (panel && colorItem) {
      if (panel == "left") setCurrLeftColor(colorItem.current);
      if (panel == "right") setCurrRightColor(colorItem.current);
    }
  }
  useEffect(() => {
    if (currentSectionIndex >= 0) {
      prevColor.current = colors[currentSectionIndex];
      newColor.current = colors[(currentSectionIndex + 1) % colors.length];
    }
  }, [currentSectionIndex]);

  useEffect(() => {
    if (!isHomeMounted) return;
    gsap
      .timeline({
        scrollTrigger: {
          id: "storyTrigger",
          trigger: ".transformationStory",
          // start: () => "top 25%",
          start: () => "top bottom",
          end: () => "bottom top",
          toggleActions: "play reset play reset",
        },
        onComplete: () => {
          storyTL.current.play();
          clockTL.current.play();
        },
        onReverseComplete: () => {
          storyTL.current.progress(0).pause();
          // storyTL.current.kill();
          clockTL.current.progress(0).pause();
          // clockTL.current.kill();
        },
      })
      .fromTo(
        ".transformationStory",
        {
          scale: 0.7,
        },
        {
          scale: 1.1,
          ease: "expo.easeOut",
          duration: 1,
          onComplete: () => {
            setIsStory(true);
          },
        }
      )
      .to(".storyIntro", {
        delay: 0.5,
        duration: 0.7,
        opacity: 0,
      });

    return () => {
      ScrollTrigger.getById("storyTrigger").kill();
    };
  }, [scrollRef.current, isHomeMounted, storyTL, clockTL, isMobile]);

  const DELAY = 4;

  useEffect(() => {
    if (!isStory) return;
    clockTL.current = gsap
      .timeline({ repeat: -1, paused: true })
      .to(".clock__dial__progress", {
        strokeDashoffset: "0",
        duration: 50,
      });

    storyTL.current = gsap.timeline({
      repeat: -1,
      delay: 1,
      paused: true,
      onRepeat: () => {},
    });
    // if (currentSectionIndex === 0) {
    //   tl.current.fromTo(".storyIntro", {});
    // }
    storyTL.current
      .set(rightTransitionRef.current, {
        rotation: -180,
        transformOrigin: "left center",
      })
      .add(() => {
        setIsImageBehind(true);
        // leftTransitionRef.current.classList.add(prevColor.current);
        setBackground("left", prevColor);
        setBackground("right", newColor);
      })
      .set(leftTransitionRef.current, {
        rotation: 0,
        transformOrigin: "left center",
      })
      .to(rightTransitionRef.current, {
        delay: DELAY,
        duration: 0.5,
        rotation: 0,
        transformOrigin: "left center",
        ease: "Power2.easeIn",
        onComplete: () => {
          update();
        },
      })
      .add(() => {
        // setIsImageBehind(true);
      })
      .to(leftTransitionRef.current, {
        duration: 0.5,
        rotation: 180,
        transformOrigin: "right center",
        onComplete: () => {
          setBackground("right", newColor);
        },
      })
      .add(() => {
        setIsImageBehind(true);
      })
      //third
      .to(rightTransitionRef.current, {
        delay: DELAY,
        duration: 0.5,
        rotation: 180,
        transformOrigin: "left center",
        ease: "Power2.easeIn",
        onComplete: () => {
          update();
          setIsImageBehind(true);
        },
      })
      .add(() => setBackground("left", prevColor))
      .to(leftTransitionRef.current, {
        duration: 0.5,
        rotation: 360,
        transformOrigin: "right center",
        onComplete: () => {
          setBackground("left", newColor);
        },
      });
  }, [isStory]);

  return (
    <div className="transformationStoryWrapper">
      <div className="transformationStory">
        <Loader />
        <PhaseTitle
          currentIndex={currentSectionIndex}
          className="phaseHeading"
        />
        <div class="wrapper" ref={wrapperRef}>
          <div className="storyIntro">
            <h1>JOIN OUR DIGITAL TRANSFORMATION JOURNY</h1>
          </div>
          {isStory && (
            <>
              <div
                className={`box leftTransition ${currLeftColor}`}
                ref={leftTransitionRef}
              ></div>
              <div
                class={`box rightTransition ${currRightColor}`}
                ref={rightTransitionRef}
              ></div>
              {currentSectionIndex === 0 && (
                <Section
                  img={img1}
                  isImageBehind={isImageBehind}
                  Text={Text}
                  index={0}
                  isEven={isEven}
                  colors={colors}
                  currentSectionIndex={currentSectionIndex}
                  IMGStyle={{
                    backgroundColor: "#2F8EE0",
                  }}
                >
                  {" "}
                  <h3>First Phase</h3>
                  <p>
                    Digital tools support traditional operations. Legacy systems
                  </p>
                </Section>
              )}
              {currentSectionIndex === 1 && (
                <Section
                  img={img2}
                  isImageBehind={isImageBehind}
                  Text={Text}
                  index={1}
                  isEven={isEven}
                  colors={colors}
                  currentSectionIndex={currentSectionIndex}
                  IMGStyle={{
                    backgroundColor: "#7CB8E4",
                  }}
                >
                  {" "}
                  <h3>Second Phase</h3>
                  <p>
                    Traditional software provides services through traditional
                    interfaces. Applications are isolated, and its services may
                    be redundant.
                  </p>
                </Section>
              )}
              {currentSectionIndex === 2 && (
                <Section
                  img={img3}
                  isImageBehind={isImageBehind}
                  Text={Text}
                  index={2}
                  isEven={isEven}
                  colors={colors}
                  IMGStyle={{
                    backgroundColor: "#59A8F7",
                  }}
                  // currentSectionIndex={currentSectionIndex}
                >
                  {" "}
                  <h3>Third Phase</h3>
                  <p>
                    Automated end-to-end customer journey through multiple
                    channels.
                  </p>
                </Section>
              )}
              {currentSectionIndex === 3 && (
                <Section
                  img={img4}
                  isImageBehind={isImageBehind}
                  index={3}
                  isEven={isEven}
                  colors={colors}
                  // currentSectionIndex={currentSectionIndex}
                >
                  {" "}
                  <h3>Fourth Phase</h3>
                  <p>
                    All applications are built on modern, and unified platform,
                    CI/CD pipeline and DevOps practices applied
                  </p>
                </Section>
              )}
              {currentSectionIndex === 4 && (
                <Section
                  img={img5}
                  isImageBehind={isImageBehind}
                  Text={Text}
                  index={4}
                  isEven={isEven}
                  colors={colors}
                  // currentSectionIndex={currentSectionIndex}
                >
                  {" "}
                  <h3>Fifth Phase</h3>
                  <p>
                    All apps running on cloud. Vendor manages Platform and
                    infra. ML-led decision making.
                  </p>
                </Section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransformationStory;

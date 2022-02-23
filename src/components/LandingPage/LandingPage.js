import style from "./LandingPage.scss";
import { gsap } from "gsap";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import img3 from "../Images/peopleStanding.jpg";
import img2 from "../Images/pointing_to_internet.png";
import img1 from "../Images/green_people.png";
import img4 from "../Images/carrying_stuff2.png";
import { ReactComponent as Loader } from "./temp.svg";
import PhaseTitle from "./PhaseTitle";

function LandingPage() {
  const wrapperRef = useRef(null);
  const visibleRef = useRef(null);
  const q = gsap.utils.selector(wrapperRef);

  const activeScope = gsap.utils.selector(visibleRef);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  let counter = 0;
  function update() {
    setCurrentSectionIndex((prevCount) => (prevCount + 1) % 4);
  }

  const setImageBehind = () => {
    document.querySelector(".description").style.zIndex = 2;
    document.querySelector(".image").style.zIndex = "initial";
  };
  const setBothBehind = () => {
    document.querySelector(".description").style.zIndex = "initial";
    document.querySelector(".image").style.zIndex = "initial";
  };
  const setDescriptionBehind = () => {
    document.querySelector(".description").style.zIndex = "initial";
    document.querySelector(".image").style.zIndex = 2;
  };
  const rightTransitionRef = useRef();
  const leftTransitionRef = useRef();
  const tl = useRef();
  const prevColor = useRef();
  const newColor = useRef();
  const colorAfterNext = useRef();

  const colors = ["#1c8a55", "#D7C9AA", "#0066A5", , "#162521"];
  function setBackground(ref, colorRef) {
    if (ref.current && colorRef.current) {
      ref.current.style.backgroundColor = colorRef.current;
    }
  }
  useEffect(() => {
    if (currentSectionIndex >= 0) {
      prevColor.current = colors[currentSectionIndex];
      newColor.current = colors[currentSectionIndex + 1];
      colorAfterNext.current = colors[(currentSectionIndex + 2) % 4];
    }
  }, [currentSectionIndex]);
  const DELAY = 4;
  useLayoutEffect(() => {
    tl.current = gsap
      .timeline({ repeat: -1, repeatDelay: DELAY, delay: DELAY })
      .set(rightTransitionRef.current, {
        rotation: 180,
        transformOrigin: "left center",
      })
      .add(() => setBackground(rightTransitionRef, prevColor))
      .add(() => setBackground(leftTransitionRef, newColor))
      .to(leftTransitionRef.current, {
        duration: 0.5,
        rotation: 180,
        transformOrigin: "right center",
        ease: "Power2.easeIn",
        onComplete: () => {
          update();
          setImageBehind();
        },
      })
      .add(() => setBackground(rightTransitionRef, prevColor))
      .to(rightTransitionRef.current, {
        duration: 0.5,
        rotation: 360,
        transformOrigin: "left center",
      })
      .add(() => setBackground(rightTransitionRef, prevColor))
      .add(() => setBackground(leftTransitionRef, newColor))

      .to(leftTransitionRef.current, {
        delay: DELAY,
        duration: 0.5,
        rotation: 360,
        transformOrigin: "right center",
        ease: "Power2.easeIn",
        onComplete: () => {
          update();
          setImageBehind();
        },
      })
      .add(() => setBackground(rightTransitionRef, prevColor))

      .to(rightTransitionRef.current, {
        duration: 0.5,
        rotation: 540,
        transformOrigin: "left center",
      });
  }, []);

  return (
    <div className="landingPage">
      <Loader />
      <PhaseTitle className="phaseHeading" />
      <div class="wrapper" ref={wrapperRef}>
        <div className={`box leftTransition`} ref={leftTransitionRef}></div>
        <div class={`box rightTransition`} ref={rightTransitionRef}></div>
        {currentSectionIndex === 0 && (
          <div
            className={`pagePart firstSection even`}
            ref={currentSectionIndex === 0 ? visibleRef : null}
            style={{
              backgroundColor: colors[0],
            }}
          >
            <div className="description">
              <div className="descriptionText">
                <h3>Automating legacy systems</h3>
                <p>
                  Many processes are automated, usually running legacy systems.
                  Some paperwork needs automation.
                </p>
              </div>
            </div>
            <div className={"image"}>
              <img src={img1} />
            </div>
          </div>
        )}
        {currentSectionIndex === 1 && (
          <div
            className={`pagePart odd`}
            ref={currentSectionIndex === 1 ? visibleRef : null}
            style={{
              backgroundColor: colors[1],
            }}
          >
            <div className="description">
              <div className="descriptionText">
                <h3>Automating SECOOOOND legacy systems</h3>
                <p>
                  Many processes are automated, usually running legacy systems.
                  Some paperwork needs automation.
                </p>
              </div>
            </div>
            <div className={"image"}>
              <img src={img2} />
            </div>
          </div>
        )}
        {currentSectionIndex === 2 && (
          <div
            class={`pagePart firstSection even`}
            style={{
              backgroundColor: colors[2],
            }}
          >
            <div
              className="description"
              ref={currentSectionIndex === 2 ? visibleRef : null}
            >
              <div className="descriptionText">
                <h3>Automating THIIIRRD legacy systems</h3>
                <p>
                  Many processes are automated, usually running legacy systems.
                  Some paperwork needs automation.
                </p>
              </div>
            </div>
            <div className={"image"}>
              <img src={img3} />
            </div>
          </div>
        )}
        {currentSectionIndex === 3 && (
          <div
            class={`pagePart firstSection odd black`}
            style={{
              backgroundColor: colors[3],
            }}
          >
            <div
              className="description"
              ref={currentSectionIndex === 3 ? visibleRef : null}
            >
              <div className="descriptionText">
                <h3>Automating FOURTHHH legacy systems</h3>
                <p>
                  Many processes are automated, usually running legacy systems.
                  Some paperwork needs automation.
                </p>
              </div>
            </div>
            <div className={"image"}>
              <img src={img4} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;

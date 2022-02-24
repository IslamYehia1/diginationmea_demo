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
import { ReactComponent as Loader } from "./clock.svg";
import PhaseTitle from "./PhaseTitle";
import { add } from "splitting";

function LandingPage() {
  const wrapperRef = useRef(null);
  const visibleRef = useRef(null);
  const q = gsap.utils.selector(wrapperRef);

  const activeScope = gsap.utils.selector(visibleRef);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  let counter = 0;
  function update() {
    setCurrentSectionIndex((prevCount) => (prevCount + 1) % 5);
    setIsEven((isEven) => !isEven);
  }

  const setImageBehind = useCallback(() => {
    if (
      document.querySelector(".description") &&
      document.querySelector(".image")
    ) {
      document.querySelector(".description").style.zIndex = 2;
      document.querySelector(".image").style.zIndex = "initial";
    }
  });
  const setBothBehind = useCallback(() => {
    document.querySelector(".description").style.zIndex = "initial";
    document.querySelector(".image").style.zIndex = "initial";
  });
  const setDescriptionBehind = useCallback(() => {
    document.querySelector(".description").style.zIndex = "initial";
    document.querySelector(".image").style.zIndex = 2;
  });
  const rightTransitionRef = useRef();
  const leftTransitionRef = useRef();
  const tl = useRef();
  const t2 = useRef();
  // const prevColor = useRef();
  // const newColor = useRef();
  const colorAfterNext = useRef();

  // const colors = ["#1c8a55", "#D7C9AA", "#0066A5", , "#162521"];
  const colors = ["colors0", "colors1", "colors2", "colors3", "colors4"];
  const [currLeftColor, setCurrLeftColor] = useState();
  const [currRightColor, setCurrRightColor] = useState();
  const prevColor = useRef();
  const newColor = useRef();
  const [isEven, setIsEven] = useState(true);
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
      colorAfterNext.current =
        colors[(currentSectionIndex + 2) % colors.length];
    }
  }, [currentSectionIndex]);
  const DELAY = 4;
  useEffect(() => {
    t2.current = gsap.timeline({ repeat: -1 }).to(".clock__dial__progress", {
      strokeDashoffset: "0",
      duration: 50,
    });

    tl.current = gsap
      .timeline({
        repeat: -1,
        delay: DELAY,
        onRepeat: () => {},
      })
      .set(rightTransitionRef.current, {
        rotation: -180,
        transformOrigin: "left center",
      })
      .add(() => {
        setImageBehind();
        console.log("PREV IS ", prevColor.current);
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
        setImageBehind();
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
        setImageBehind();
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
          setImageBehind();
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
  }, []);

  return (
    <div className="landingPage">
      <Loader />
      <PhaseTitle currentIndex={currentSectionIndex} className="phaseHeading" />
      <div class="wrapper" ref={wrapperRef}>
        <div
          className={`box leftTransition ${currLeftColor}`}
          ref={leftTransitionRef}
        ></div>
        <div
          class={`box rightTransition ${currRightColor}`}
          ref={rightTransitionRef}
        ></div>
        {currentSectionIndex === 0 && (
          <div
            className={`pagePart firstSection ${isEven ? "even" : "odd"} ${
              colors[0]
            }`}
            ref={currentSectionIndex === 0 ? visibleRef : null}
            // style={{
            //   backgroundColor: colors[0],
            // }}
          >
            <div className="description">
              <div className="descriptionText">
                <h3>Digital Transformation Journy</h3>
                <p>Adding digital systems to support traditional operations.</p>
              </div>
            </div>
            <div className={"image"}>
              <img src={img1} />
            </div>
          </div>
        )}
        {currentSectionIndex === 1 && (
          <div
            className={`pagePart ${isEven ? "even" : "odd"} ${colors[1]}`}
            ref={currentSectionIndex === 1 ? visibleRef : null}
            // style={{
            //   backgroundColor: colors[1],
            // }}
          >
            <div className="description">
              <div className="descriptionText">
                <h3>Second Phase</h3>
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
            className={`pagePart ${isEven ? "even" : "odd"} ${colors[2]}`}
            // style={{
            //   backgroundColor: "red",
            // }}
          >
            <div
              className="description"
              ref={currentSectionIndex === 2 ? visibleRef : null}
            >
              <div className="descriptionText">
                <h3>Third Phase</h3>
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
          <div className={`pagePart ${isEven ? "even" : "odd"} ${colors[3]}`}>
            <div
              className={`description`}
              ref={currentSectionIndex === 3 ? visibleRef : null}
            >
              <div className="descriptionText">
                <h3>Fourth phase</h3>
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
        {currentSectionIndex === 4 && (
          <div className={`pagePart ${isEven ? "even" : "odd"} ${colors[4]}`}>
            <div
              className={`description`}
              ref={currentSectionIndex === 4 ? visibleRef : null}
            >
              <div className="descriptionText">
                <h3>Fifth phase</h3>
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

import style from "./LandingPage.scss";
import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import img1 from "../Images/Slide_2.png";
import img2 from "../Images/carrying_stuff.png";
import img3 from "../Images/Slide_4.png";
import { ReactComponent as Loader } from "./temp.svg";
console.clear();

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

  const tl = useRef();
  const prevColor = useRef();
  const newColor = useRef();
  const colorAfterNext = useRef();
  const colors = ["#2196c7", "#7CB8E4", "#1c8a55", "#54c5d2"];
  useEffect(() => {
    if (currentSectionIndex >= 0) {
      prevColor.current = colors[currentSectionIndex];
      newColor.current = colors[(currentSectionIndex + 1) % 4];
      colorAfterNext.current = colors[(currentSectionIndex + 2) % 4];
    }
  }, [currentSectionIndex]);
  useEffect(() => {
    tl.current = gsap
      .timeline({ repeat: -1, repeatDelay: 10, delay: 0 })
      .set(q(".rightTransition"), {
        rotation: 180,
        transformOrigin: "left center",
        backgroundColor: prevColor.current,
      })
      .set(q(".leftTransition"), {
        backgroundColor: newColor.current,
      })
      .to(q(".leftTransition"), {
        duration: 1,
        rotation: 180,
        transformOrigin: "right center",
        ease: "Power2.easeIn",
        onComplete: update,
      })
      .set(q(".leftTransition"), {
        // backgroundColor: newColor.current,
        onComplete: setImageBehind,
      })
      .set(q(".rightTransition"), {
        backgroundColor: prevColor.current,
      })
      .to(q(".rightTransition"), {
        duration: 1,
        rotation: 360,
        transformOrigin: "left center",
      })
      .set(q(".rightTransition"), {
        backgroundColor: prevColor.current,
        // onComplete: setBothBehind,
        // onComplete: setImageBehind,
        // onComplete: setZIndex,
      })
      .set(q(".leftTransition"), {
        backgroundColor: colorAfterNext.current,
      })

      .to(q(".leftTransition"), {
        duration: 1,
        rotation: 360,
        transformOrigin: "right center",
        ease: "Power2.easeIn",
        onComplete: () => {
          update();
          setImageBehind();
        },
      })
      .set(".rightTransition", {
        backgroundColor: prevColor.current,
      })
      .to(q(".rightTransition"), {
        duration: 1,
        rotation: 540,
        transformOrigin: "left center",
      });
  }, []);

  return (
    <div className="landingPage">
      <Loader />
      <h1 className="phaseHeading"> FIRST PHASE </h1>
      <div class="wrapper" ref={wrapperRef}>
        <div
          className={`box leftTransition`}
          // style={{ backgroundColor: leftColor }}
        ></div>
        <div class={`box rightTransition`}></div>
        {/* <div class="box leftTransition blue"></div> */}
        {currentSectionIndex === 0 && (
          <div
            className={`pagePart firstSection even lighBlue`}
            ref={currentSectionIndex === 0 ? visibleRef : null}
            style={{
              backgroundColor: "#2196c7",
            }}
          >
            <div
              className="description"
              // style={{ zIndex: "auto" }}
            >
              <div className="descriptionText">
                <h3>Automating legacy systems</h3>
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
        {currentSectionIndex === 1 && (
          <div
            className={`pagePart odd`}
            // style={currentSectionIndex === 1 ? { zIndex: 2 } : {}}
            ref={currentSectionIndex === 1 ? visibleRef : null}
            style={{
              backgroundColor: "#7CB8E4",
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
              <img src={img1} />
            </div>
          </div>
        )}
        {currentSectionIndex === 2 && (
          <div
            class={`pagePart firstSection even`}
            style={{
              backgroundColor: "#1c8a55",
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
              backgroundColor: "#54c5d2",
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
              <img src={img2} />
            </div>
          </div>
        )}
        {/* <div class="image rightImg lastImage pagePart active">
          <img src={img2} />
        </div> */}
        {/* <div class="rightImg">
          <img src={img3} />
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;

import style from "./LandingPage.scss";
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
function LandingPage() {
  const wrapperRef = useRef(null);
  const [isImageBehind, setIsImageBehind] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollRef = useContext(MyContext);
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
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".backgroundOverlay",
          // start: isMobile ? "-200 30%" : "-100 10%",
          start: "top 50%",
          end: "bottom top",
          // end: "bottom+=20% bottom",
          // pin: ".backgroundOverlay",
          // scrub: true,
          toggleActions: "play reverse play reverse",
          scroller: scrollRef,
          fastScrollEnd: true,
          // onLeave: () => {
          //   storyTL.current.pause();
          //   clockTL.current.pause();
          // },
        },
      })

      // tl.fromTo(
      //   ".backgroundOverlay",
      //   { background: "transparent" },
      //   { background: "#f6f9fb", duration: 0.1 }
      // )
      .to(".landingPage", {
        // scale: 1.08,
        maxWidth: "+=10%",
        height: "90%",
        duration: 0.2,
      })
      .to(".storyIntro", {
        delay: 1,
        opacity: 0,
        onComplete: () => {
          storyTL.current.resume();
          clockTL.current.resume();
        },
      });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".backgroundOverlay",
        start: "top top",
        end: "bottom+=20% bottom",
        // scrub: true,
        scroller: scrollRef,
        // toggleActions: "play pause play reverse",

        // scale: 1.5,
        pin: true,
        markers: true,
        // toggleClass: "whiteBackground",
        onEnter: () => {
          gsap.set(".backgroundOverlay", {
            backgroundColor: "#f6f9fb",
          });
        },
        onLeaveBack: () => {
          gsap.set(".backgroundOverlay", {
            backgroundColor: "transparent",
          });
        },
      },
    });
    // tl2.to({}, {});
    // tl2.to(".backgroundOverlay", { backgroundColor: "white", duration: 0 });

    // const tl2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".backgroundOverlay",
    //     start: isMobile ? "-200 30%" : "-100 10%",
    //     end: "bottom+=20 bottom",
    //     // end: "bottom+=20% bottom",
    //     pin: ".backgroundOverlay",
    //     // scrub: true,
    //     toggleActions: "play reverse play reverse",
    //     scroller: scrollRef,
    //     fastScrollEnd: true,
    //     markers: true,
    //     // onLeave: () => {
    //     //   storyTL.current.pause();
    //     //   clockTL.current.pause();
    //     // },
    //   },
    // });
  }, [scrollRef, storyTL, clockTL, isMobile]);

  const DELAY = 4;

  useEffect(() => {
    clockTL.current = gsap
      .timeline({ repeat: -1, paused: true })
      .to(".clock__dial__progress", {
        strokeDashoffset: "0",
        duration: 50,
      });

    storyTL.current = gsap.timeline({
      repeat: -1,
      delay: DELAY,
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
  }, []);

  return (
    <div className="backgroundOverlay">
      <div className="landingPage">
        <Loader />
        <PhaseTitle
          currentIndex={currentSectionIndex}
          className="phaseHeading"
        />
        <div class="wrapper" ref={wrapperRef}>
          <div className="storyIntro">
            <h1>JOIN OUR DIGITAL TRANSFORMATION JOURNY</h1>
          </div>
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
                backgroundColor: "#1C8A55",
              }}
            >
              {" "}
              <h3>Second Phase</h3>
              <p>
                Traditional software provides services through traditional
                interfaces. Applications are isolated, and its services may be
                redundant.
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
                Automated end-to-end customer journey through multiple channels.
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
                All apps running on cloud. Vendor manages Platform and infra.
                ML-led decision making.
              </p>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

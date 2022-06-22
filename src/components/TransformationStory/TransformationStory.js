import style from "./TransformationStory.scss";
import { useEffect, useRef, useState } from "react";
import Section from "./Section";
// import img0 from "../Images/server_transparent.png";
import img0 from "../Images/twoLaptops.png";
import img1 from "../Images/Slide 1.png";
// import img2 from "../Images/Slide 2.png";
import img2 from "../Images/four_laptops-01-01.png";
import img3 from "../Images/Slide 3.png";
import img4 from "../Images/Slide 4.png";
import img5 from "../Images/Slide 5.png";
import gsap from "gsap";
import { ReactComponent as Loader } from "./clock.svg";
import PhaseTitle from "./PhaseTitle";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactComponent as GreenCircle } from "../Images/imagination_circle_green.svg";
gsap.registerPlugin(ScrollTrigger);
function TransformationStory({ isHomeMounted }) {
  const wrapperRef = useRef(null);
  const leftTransitionRef = useRef(null);
  const rightTransitionRef = useRef(null);
  const mainTimeline = useRef(null);
  const circleHoverAnimation = useRef(null);
  const clockFillTL = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const DELAY = 4;
  useEffect(() => {
    const sections = gsap.utils.toArray(".storySection");
    mainTimeline.current = gsap.timeline({
      repeat: -1,
      paused: true,
      repeatDelay: DELAY,
    });
    mainTimeline.current.timeScale(0.7);
    gsap.set(rightTransitionRef.current, {
      rotation: -180,
    });
    gsap.set(sections[0], {
      visibility: "visible",
    });

    sections.forEach((section, index) => {
      const q = gsap.utils.selector(section);
      const tl = gsap.timeline();

      if (index % 2 === 0) {
        tl.set(rightTransitionRef.current, {
          autoAlpha: 0,
          zIndex: 2,
          rotation: -180,
          background: window
            .getComputedStyle(section, null)
            .getPropertyValue("background"),
        })
          .to(rightTransitionRef.current, {
            autoAlpha: 1,
          })
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
          .set(section, {
            visibility: "hidden",
          })
          .set(leftTransitionRef.current, {
            zIndex: 2,
          })
          .set(rightTransitionRef.current, {
            zIndex: 1,
          })
          .to(rightTransitionRef.current, {
            rotation: "+=180",
            transformOrigin: "left center",
            ease: "power4.out",
          })
          .add(() => {
            setCurrentIndex((index + 1) % sections.length);
          })
          .set(rightTransitionRef.current, {
            autoAlpha: 0,
          })
          .to(leftTransitionRef.current, {
            autoAlpha: 0,
          });
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
          .set(rightTransitionRef.current, {
            zIndex: 2,
          })
          .set(leftTransitionRef.current, {
            zIndex: 1,
          })
          .set(sections[(index + 1) % sections.length], {
            visibility: "visible",
          })
          .set(section, {
            visibility: "hidden",
          })
          .to(leftTransitionRef.current, {
            rotation: "+=180",
            transformOrigin: "right center",
            ease: "power4.out",
          })
          .add(() => {
            setCurrentIndex((index + 1) % sections.length);
          })
          .set(leftTransitionRef.current, {
            autoAlpha: 0,
          })
          .to(rightTransitionRef.current, {
            autoAlpha: 0,
          });
      }
      mainTimeline.current.add(tl, index * DELAY);
    });
    clockFillTL.current = gsap
      .timeline({
        repeat: -1,
        repeatDelay: DELAY,
        paused: true,
      })
      .to(".clock__dial__progress", {
        strokeDashoffset: "0",
        duration: mainTimeline.current.duration(),
      });
    circleHoverAnimation.current = gsap
      .timeline({ paused: true })
      .to(".imagination_circle_green_fill", {
        attr: {
          r: "49%",
        },
      })
      .to(
        ".imagination_circle_green_arrow",
        {
          rotate: -30,
          transformOrigin: "center center",
        },
        "<"
      );
  }, []);
  useEffect(() => {
    if (!isHomeMounted) return;
    const q = gsap.utils.selector(wrapperRef);
    const timeOut = null;
    const storyTrigger2 = gsap
      .timeline({
        onStart: () => {
          if (timeOut) clearTimeout(timeOut);
        },
        onComplete: () => {
          mainTimeline.current.play();
          clockFillTL.current.play();
          // setTimeout(() => {}, (DELAY - 2) * 1000);
        },
        scrollTrigger: {
          id: "storyTrigger2",
          trigger: ".transformationStoryWrapper",
          // start: () => "top 25%",
          start: () => "center bottom",
          end: () => "bottom top",
          toggleActions: "play reset play none",
        },
      })

      .from(
        q(".textLine span"),
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

    gsap
      .timeline({
        scrollTrigger: {
          id: "storyTrigger",
          trigger: ".transformationStoryWrapper",
          // start: () => "top 25%",
          start: () => "top bottom",
          end: () => "bottom top",
          toggleActions: "play reset play reset",
          onLeave: () => {
            mainTimeline.current.progress(0).pause();
          },
          onLeaveBack: () => {
            mainTimeline.current.progress(0).pause();
            storyTrigger2.pause(0);
          },
        },
        onComplete: () => {
          // storyTL.current.play();
          // clockTL.current.play();
        },
        onReverseComplete: () => {
          // storyTL.current.progress(0).pause();
          // storyTL.current.kill();
          // clockTL.current.progress(0).pause();
          // clockTL.current.kill();
        },
      })
      .fromTo(
        ".transformationStory",
        {
          scale: 0.6,
        },
        {
          scale: 1,
          ease: "expo.easeOut",
          duration: 1,
          onComplete: () => {
            // setIsStory(true);
          },
        }
      );
    gsap.timeline({ repeat: -1 }).to(`.greenCircle .green_circle_text`, {
      rotate: 360,
      transformOrigin: "center center",
      ease: "linear",
      duration: 15,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: `.transformationStory`,
          start: "30% top",
          scrub: true,
        },
      })
      .fromTo(
        `body`,

        { backgroundColor: "#0D1F22" },
        {
          backgroundColor: "#f4f4f9",
          immediateRender: false,
        }
      );

    return () => {
      ScrollTrigger.getById("storyTrigger").kill();
      ScrollTrigger.getById("storyTrigger2").kill();
    };
  }, [isHomeMounted]);

  return (
    <>
      <div className="sectionTitle">
        <div className="title">
          <h1>
            <span>
              <span className="">Our five phases transformation</span>{" "}
              <span>journy to take your business</span>
              <span>tech to the next level</span>
            </span>
          </h1>
          {/* <GreenCircle
            onMouseOver={() => {
              circleHoverAnimation.current.play();
            }}
            onMouseLeave={() => {
              circleHoverAnimation.current.reverse();
            }}
            className="greenCircle"
          /> */}
        </div>
        <div className="content">
          {/* <p>
            {" "}
            Providing our clients with the leader worldwide solution to achieve
            the digital transformation in the ECM, Low code, RPA, BI, AI and
            other emerging technologies.{" "}
          </p> */}
        </div>
      </div>
      <div className="transformationStoryWrapper">
        <div className="transformationStory">
          <Loader className="clockSVG" />
          <PhaseTitle currentIndex={currentIndex} className="phaseHeading" />
          <div class="wrapper" ref={wrapperRef}>
            <div className="boxesContainer">
              <div
                className={`box leftTransition `}
                ref={leftTransitionRef}
              ></div>
              <div class={`box rightTransition`} ref={rightTransitionRef}></div>
            </div>
            <Section img={img0} Text={Text} index={0} className="colors0 even">
              <h3>
                {" "}
                <span className="textLine">
                  <span>Join our digital transformation</span>
                </span>
              </h3>
              <p>
                <span className="textLine">
                  <span>
                    Digination will help you transform your existing
                    infrastructure into a more technologically and digitally
                    advanced infrastructure.
                  </span>
                </span>
              </p>
            </Section>
            <Section img={img1} index={0} className="colors1 odd">
              <h3>First Phase</h3>
              <p>
                Digital tools support traditional operations. Legacy systems
              </p>
            </Section>
            <Section img={img2} index={1} className="colors2 even">
              <h3>Second Phase</h3>
              <p>
                Traditional software provides services through traditional
                interfaces. Applications are isolated, and its services may be
                redundant.
              </p>
            </Section>
            <Section img={img3} index={2} className="colors3 odd">
              <h3>Third Phase</h3>
              <p>
                Automated end-to-end customer journey through multiple channels.
              </p>
            </Section>
            <Section img={img4} index={3} className="colors4 even">
              <h3>Fourth Phase</h3>
              <p>
                All applications are built on modern, and unified platform,
                CI/CD pipeline and DevOps practices applied
              </p>
            </Section>
            <Section img={img5} className="colors5 odd">
              <h3>Fifth Phase</h3>
              <p>
                All apps running on cloud. Vendor manages Platform and infra.
                ML-led decision making.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransformationStory;

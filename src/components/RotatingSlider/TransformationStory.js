import style from "./TransformationStory.module.scss";
import { useEffect, useRef, useState } from "react";
import Section from "./Section";
// import img0 from "../Images/server_transparent.png";
// import img0 from "../Images/twoLaptops.png";
import img0 from "../Images/Low_Code.png";
import img1 from "../Images/altyrex.jpg";
import img2 from "../Images/qlik.png";
import img3 from "../Images/chatbot.png";
// import img1 from "../Images/Slide 1.png";
// import img2 from "../Images/Slide 2.png";
// import img2 from "../Images/four_laptops-01-01.png";
// import img3 from "../Images/Slide 3.png";
// import img4 from "../Images/Slide 4.png";
// import img4 from "../Images/Slide 4.png";
import img4 from "../Images/outsystems.mp4";
import img5 from "../Images/Slide 5.png";
import gsap from "gsap";
import { ReactComponent as Loader } from "./circle.svg";
import PhaseTitle from "./PhaseTitle";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LinkBtn from "../Button/LinkBtn";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";
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
    const sections = gsap.utils.toArray(`.${style.storySection}`);
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

    sections.forEach((section, index) => {
      const q = gsap.utils.selector(section);
      const tl = gsap.timeline();

      // gsap.timeline({
      //   scrollTrigger: {
      //     // id: "storyTrigger",
      //     trigger: section,
      //     // start: () => "top 25%",
      //     start: () => "top center",
      //     end: () => "center-=20% center",
      //     // toggleActions: "play reset play reset",
      //     markers: true,
      //     scrub: true,
      //   },
      // });

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
    // setTimeout(() => {
    //   sections.forEach((section, index) => {
    //     const q = gsap.utils.selector(section);
    //     gsap.fromTo(
    //       q(".description"),
    //       {
    //         backgroundColor: "#D7D3C9",
    //       },
    //       {
    //         backgroundColor: "$Primary",
    //         scrollTrigger: {
    //           // scroller: "[data-scroll-container]",
    //           trigger: section,
    //           start: () => "top center+=20%",
    //           end: () => "top center+=10%",
    //           scrub: true,
    //         },
    //       }
    //     );
    //   });
    // }, 100);

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
          trigger: `.${style.transformationStoryWrapper}`,
          // start: () => "top 25%",
          start: () => "top bottom",
          end: () => "bottom top",
          toggleActions: "play reset play none",
        },
      })

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

    gsap.timeline({ repeat: -1 }).to(`.greenCircle .green_circle_text`, {
      rotate: 360,
      transformOrigin: "center center",
      ease: "linear",
      duration: 15,
    });

    return () => {
      ScrollTrigger.getById("storyTrigger").kill();
      ScrollTrigger.getById("storyTrigger2").kill();
    };
  }, [isHomeMounted]);

  return (
    <div id="homePageSlider">
      <div className={style.sectionTitle}>
        <div className={style.title}>
          <h1>
            <span>
              <span className={style.somethin}>
                We partner with leading global{" "}
              </span>{" "}
              <span> IT firms to support our customers.</span>
            </span>
          </h1>
          <LinkBtn className={style.exploreBtn} to="/partners">
            <span>Explore partners</span>
            <RightArrow />
          </LinkBtn>

          {/* <GreenCircle
            onMouseOver={() => {
              circleHoverAnimation.current.play();
            }}
            onMouseLeave={() => {
              circleHoverAnimation.current.reverse();
            }}
            className={style.greenCircle"
          /> */}
        </div>
        <div className={style.content}>
          {/* <p>
            {" "}
            Providing our clients with the leader worldwide solution to achieve
            the digital transformation in the ECM, Low code, RPA, BI, AI and
            other emerging technologies.{" "}
          </p> */}
        </div>
      </div>
      <div className={style.transformationStoryWrapper}>
        <div className={style.transformationStory}>
          <Loader className={style.clockSVG} />
          //{" "}
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
            <Section
              img={img0}
              Text={Text}
              index={0}
              className={`${style.colors0} ${style.even}`}
            >
              <h3 className={style.slideTitle}>
                First Digination will help you transform your existing
                infrastructure
              </h3>
              <LinkBtn to="/partners/" className={style.learnMoreBtn}>
                Learn More
              </LinkBtn>
              {/* <p>
                <span className={style.textLine">
                  <span>
                    Digination will help you transform your existing
                    infrastructure into a more technologically and digitally
                    advanced infrastructure.
                  </span>
                </span>
              </p> */}
            </Section>
            <Section
              img={img1}
              index={0}
              className={`${style.colors1} ${style.odd}`}
            >
              <h3 className={style.slideTitle}>
                second Digination will help you transform your existing
                infrastructure
              </h3>

              <LinkBtn to="/partners/" className={style.learnMoreBtn}>
                Learn More
              </LinkBtn>
            </Section>
            <Section
              img={img2}
              index={1}
              className={`${style.colors2} ${style.even}`}
            >
              <h3 className={style.slideTitle}>
                Third Digination will help you transform your existing
                infrastructure
              </h3>
              <LinkBtn to="/partners/" className={style.learnMoreBtn}>
                Learn More
              </LinkBtn>
            </Section>
            <Section
              img={img3}
              index={2}
              className={`${style.colors3} ${style.odd}`}
            >
              <h3 className={style.slideTitle}>
                Fourth Digination will help you transform your existing
                infrastructure
              </h3>
              <LinkBtn to="/partners/" className={style.learnMoreBtn}>
                Learn More
              </LinkBtn>
            </Section>

            {/* <Section video img={img4} index={3} className={style.colors4 even">
              <h3>Fourth Phase</h3>
              <p>
                All applications are built on modern, and unified platform,
                CI/CD pipeline and DevOps practices applied
              </p>
            </Section> */}

            {/*
            <Section img={img5} className={style.colors5 odd">
              <h3>Fifth Phase</h3>
              <p>
                All apps running on cloud. Vendor manages Platform and infra.
                ML-led decision making.
              </p>
            </Section>{" "}
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformationStory;

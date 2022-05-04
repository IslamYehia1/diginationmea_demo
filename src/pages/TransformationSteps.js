import style from "./TransformationSteps.module.scss";
import stepOneImg from "../components/Images/Slide 1.png";
import stepTwoImg from "../components/Images/Slide 2.png";
import stepThreeImg from "../components/Images/Slide 3.png";
import stepFourImg from "../components/Images/Slide 4.png";
import stepFiveImg from "../components/Images/Slide 5.png";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../App";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function TransformationSteps({ isPageMounted }) {
  const { scrollRef } = useContext(MyContext);
  const location = useLocation();
  useLayoutEffect(() => {
    if (!isPageMounted) return;
    // const steps = gsap.utils.toArray(`.${style.step}`);
    // steps.forEach((step, index) => {
    //   // ScrollTrigger.create({
    //   //     trigger :
    //   // })
    //   const q = gsap.utils.selector(step);
    //   gsap.fromTo(
    //     step,
    //     {
    //       height: "7rem",
    //       opacity: 0.4,
    //     },
    //     {
    //       scrollTrigger: {
    //         id: "trigger0",
    //         trigger: `[data-step-img-index="${index}"]`,
    //         scroller: scrollRef.current,
    //         // scrub: true,
    //         toggleActions: "play reverse play reverse",
    //         start: "top 20%",
    //         end: "bottom 20%",
    //       },
    //       height: "15rem",
    //       opacity: 1,
    //       onComplete: () => {
    //         gsap.to(q(`.${style.stepDescription}`), {
    //           autoAlpha: 1,
    //         });
    //       },
    //       onReverseComplete: () => {
    //         gsap.to(q(`.${style.stepDescription}`), {
    //           autoAlpha: 0,
    //         });
    //       },
    //     }
    //   );
    // });

    gsap.set(`.${style.stepImgWrapper}`, {
      //   zIndex: (i, target, targets) => targets.length - i,
      zIndex: (i, target, targets) => i,
    });

    // var images = gsap.utils.toArray(".panel:not(.purple)");
    // var images = gsap.utils.toArray(`.${style.imgWrapper}`);
    var images = gsap.utils.toArray(`.${style.stepImgWrapper}`);

    images.forEach((image, i) => {
      const q = gsap.utils.selector(image);
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${style.transformationSteps}`,
          // scroller: scrollRef.current,
          start: () => "top center-=" + window.innerHeight * i,
          //   start: () => "top center",
          end: () => "+=" + window.innerHeight,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      });

      //   tl.to(image, { height: 0 });
      if (i > 0)
        tl.to(
          images[i - 1],

          {
            duration: 5,
            opacity: 0,
          }
        );
      tl.to(
        q(".clip circle"),
        {
          duration: 10,
          attr: {
            r: 1.5,
          },
        },
        "<"
      );
    });
    ScrollTrigger.create({
      id: "trigger1",
      trigger: `.${style.imgsWrapper}`,
      start: "top 15%",
      endTrigger: `.${style.firstColumn}`,
      end: () => "bottom bottom",
      pin: true,
      // scroller: scrollRef.current,
    });

    return () => {
      ScrollTrigger.getById("trigger1").kill();
    };
  }, [scrollRef.current, isPageMounted]);
  return (
    <div className={style.transformationStepsWrapper}>
      <div className={style.transformationSteps}>
        <div className={style.firstColumn}>
          <h1 className={style.sectionTitle}>
            our digital transfomration journy
          </h1>
          <div className={style.steps}>
            {/* <div className={style.line}></div> */}
            <div className={style.stepsText}>
              <div className={style.step} data-index={0}>
                {/* <img src={stepOneIcon} alt="" /> */}
                <div className={style.stepText}>
                  <h1>First phase</h1>
                  <h2 className={style.stepTitle}>Digital presence</h2>
                  <p className={style.stepDescription}>
                    Digital tools support traditional operations. Legacy systems
                  </p>
                </div>
              </div>
              <div className={style.step} data-index={1}>
                {/* <img src={stepTwoIcon} alt="" /> */}
                <div className={style.stepText}>
                  <h1>Second phase</h1>
                  <h2 className={style.stepTitle}>Isolated</h2>
                  <p className={style.stepDescription}>
                    Traditional software provides services through traditional
                    interfaces. Applications are isolated, and its services may
                    be redundant.
                  </p>
                </div>
              </div>
              <div className={style.step} data-index={2}>
                {/* <img src={stepThreeIcon} alt="" /> */}
                <div className={style.stepText}>
                  <h1>Third phase</h1>
                  <h2 className={style.stepTitle}>Integrated</h2>
                  <p className={style.stepDescription}>
                    Automated end-to-end customer journey through multiple
                    channels.
                  </p>
                </div>
              </div>
              <div className={style.step} data-index={3}>
                {/* <img src={stepFourIcon} alt="" /> */}
                <div className={style.stepText}>
                  <h1>Fourth phase</h1>
                  <h2 className={style.stepTitle}>Synchronized</h2>
                  <p className={style.stepDescription}>
                    All applications are built on modern, and unified platform,
                    CI/CD pipeline and DevOps practices applied
                  </p>
                </div>
              </div>
              <div className={style.step} data-index={4}>
                {/* <img src={stepFiveIcon} alt="" /> */}
                <div className={style.stepText}>
                  <h1>Fifth phase</h1>
                  <h2 className={style.stepTitle}>Digitally mature</h2>
                  <p className={style.stepDescription}>
                    All apps running on cloud. Vendor manages Platform and
                    infra. ML-led decision making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.secondColumn}>
          <div className={style.imgsWrapper}>
            <div className={style.stepImgWrapper}>
              <svg height="0" width="0">
                <defs>
                  <clipPath
                    className="clip"
                    id="first"
                    clipPathUnits="objectBoundingBox"
                  >
                    <circle
                      cx="0.5"
                      cy="1.2"
                      r="0"
                      transform="translate(0.5 1.2) scale(1.360377358490566 1) translate(-0.5 -1.2)"
                    ></circle>
                  </clipPath>
                </defs>
              </svg>
              <div
                style={{
                  clipPath: "url(#first)",
                  opacity: 1,
                }}
                className={style.imgWrapper}
                data-step-img-index="0"
              >
                <img src={stepOneImg} alt="" />
              </div>
            </div>
            <div className={style.stepImgWrapper}>
              <svg width="0" height="0">
                <defs>
                  <clipPath
                    className="clip"
                    id="second"
                    clipPathUnits="objectBoundingBox"
                  >
                    <circle
                      cx="0.5"
                      cy="1.2"
                      r="0"
                      transform="translate(0.5 1.2) scale(1.360377358490566 1) translate(-0.5 -1.2)"
                    ></circle>
                  </clipPath>
                </defs>
              </svg>
              <div
                style={{ clipPath: "url(#second)", opacity: 1 }}
                className={style.imgWrapper}
                data-step-img-index="0"
              >
                <img src={stepTwoImg} alt="" />
              </div>
            </div>
            <div className={style.stepImgWrapper}>
              <svg width="0" height="0">
                <defs>
                  <clipPath
                    className="clip"
                    id="third"
                    clipPathUnits="objectBoundingBox"
                  >
                    <circle
                      cx="0.5"
                      cy="1.2"
                      r="0"
                      transform="translate(0.5 1.2) scale(1.360377358490566 1) translate(-0.5 -1.2)"
                    ></circle>
                  </clipPath>
                </defs>
              </svg>
              <div
                style={{ clipPath: "url(#third)", opacity: 1 }}
                className={style.imgWrapper}
                data-step-img-index="0"
              >
                <img src={stepThreeImg} alt="" />
              </div>
            </div>
            <div className={style.stepImgWrapper}>
              <svg width="0" height="0">
                <defs>
                  <clipPath
                    className="clip"
                    id="fourth"
                    clipPathUnits="objectBoundingBox"
                  >
                    <circle
                      cx="0.5"
                      cy="1.2"
                      r="0"
                      transform="translate(0.5 1.2) scale(1.360377358490566 1) translate(-0.5 -1.2)"
                    ></circle>
                  </clipPath>
                </defs>
              </svg>
              <div
                style={{ clipPath: "url(#fourth)", opacity: 1 }}
                className={style.imgWrapper}
                data-step-img-index="0"
              >
                <img src={stepFourImg} alt="" />
              </div>
            </div>
            <div className={style.stepImgWrapper}>
              <svg width="0" height="0">
                <defs>
                  <clipPath
                    className="clip"
                    id="fifth"
                    clipPathUnits="objectBoundingBox"
                  >
                    <circle
                      cx="0.5"
                      cy="1.2"
                      r="0"
                      transform="translate(0.5 1.2) scale(1.360377358490566 1) translate(-0.5 -1.2)"
                    ></circle>
                  </clipPath>
                </defs>
              </svg>
              <div
                style={{ clipPath: "url(#fifth)", opacity: 1 }}
                className={style.imgWrapper}
                data-step-img-index="0"
              >
                <img src={stepFiveImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformationSteps;

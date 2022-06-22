import style from "./LandingPage.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/all";
import { useEffect, useContext } from "react";
import Circle from "../../SVG/imagination_circle.png";
import Logo from "../Images/logo.png";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";

gsap.registerPlugin(TextPlugin);

function LandingPage({ isHomeMounted }) {
  const typeWritterText = [
    // "Extensive experience of Low code",
    "Low code",
    "Business Intelligence",
    "Business Processes",
    "Enterprise Content Management",
    "Analytics",
  ];
  const mainTimeline = gsap.timeline({ repeat: -1 });

  useEffect(() => {
    if (!isHomeMounted) return;
    gsap.set(`.${style.landingBackground}`, {
      autoAlpha: 1,
    });

    // const tween2 = gsap
    //   .timeline({
    //     scrollTrigger: {
    //       id: "landingBackground",
    //       trigger: `.${style.landingBackground}`,
    //       start: () => "top top",
    //       end: () => "+=100%",
    //       scrub: true,
    //       pin: ".landingBackground",
    //       // markers: true,
    //       // pinSpacing: false,
    //     },
    //   })
    //   .to(`.landingBackground`, {
    //     duration: 10,
    //     autoAlpha: 0,
    //   })
    //   .to(
    //     `.${style.landingPage}`,
    //     {
    //       duration: 5,
    //       opacity: 0,
    //     },
    //     "<"
    //   );

    const bodyTL = gsap
      .timeline({
        scrollTrigger: {
          id: "bodyLandingPageBg",
          trigger: `.${style.landingPageWrapper}`,
          start: () => "40% top",
          end: () => "bottom-=30% top",
          scrub: true,
        },
      })
      .fromTo(
        "body",
        {
          backgroundColor: "#4cac83c9",
          // backgroundColor: "#1d2b28",
          // backgroundColor: "#4C9F6F",
        },
        {
          // backgroundColor: "#f4f4f9",
          backgroundColor: "#0D1F22",
        }
      )
      .to(
        `.sectionTitle`,
        {
          color: "white",
          // color: "#0d1f22",
        },
        "<"
      )
      .to(
        `.${style.landingPage}`,
        {
          opacity: 0,
        },
        "<"
      );
    return () => {
      ScrollTrigger.getById("bodyLandingPageBg").kill();
    };
  }, [isHomeMounted]);
  useEffect(() => {
    gsap.timeline({ repeat: -1 }).to(`#spinningCircle`, {
      rotate: 360,
      duration: 20,
      ease: "none",
    });
    gsap.fromTo(
      "#cursor",
      { autoAlpha: 0, x: -10 },
      { autoAlpha: 1, duration: 0.7, repeat: -1, ease: "steps(1)" }
    );
    typeWritterText.forEach((text, index) => {
      let tween = gsap
        .timeline({ yoyo: true, repeat: 1, repeatDelay: 2 })
        .to("#text", {
          text: {
            value: text,
          },
          duration: 0.08 * text.length,
          delay: 1,
          ease: "none",
        });
      mainTimeline.add(tween, index * tween.totalDuration());
    });
    // });
  }, []);
  return (
    <div className={`${style.landingPageWrapper}`}>
      {/* <div
        className={`${style.landingBackground} landingBackground`}
        // data-scroll-sticky
        // data-scroll-target="[data-scroll-container]"
        // data-scroll
      ></div> */}
      <div className={style.landingPage}>
        <div className={style.landingContent}>
          <div className={style.landingHeading}>
            <div className={style.headingText}>
              <div className={style.headingFirstLine}>Your partner</div>
              <div className={style.headingSecondLine}>For Digital</div>
              <div className={style.headingThirdLine}>Transformation</div>
            </div>
            <div className={style.loop}>
              <div className={style.loopImg}>
                <img id="spinningCircle" src={Circle} alt="" />
                <img src={Logo} alt="" />
              </div>
            </div>
          </div>
          <div className={style.description}>
            <p>
              We are a regional technology enterprise specialized in providing
              Digital Transformation and complex technology solutions to a wide
              array of industries and businesses.
            </p>
            <p
              // height="100%"
              // fill="#000"
              // x="50%"
              // y="50%"
              // dominant-baseline="middle"
              // text-anchor="start"
              id={style.myText}
              className={style.changingText}
            >
              <span id="text"></span>
              <span id="cursor">|</span>
            </p>
            <div className={style.buttons}>
              <button>
                <p>Contact Us</p>
                <RightArrow />
              </button>
              <button>
                <p>See services</p>
                <RightArrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

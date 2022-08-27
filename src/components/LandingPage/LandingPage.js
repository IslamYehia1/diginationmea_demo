import style from "./LandingPage.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/all";
import { useEffect, useContext } from "react";
import Logo from "../Images/logo.png";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";
import { ReactComponent as Left } from "../../SVG/left.svg";
import { ReactComponent as Right } from "../../SVG/right.svg";
import { ReactComponent as MobileBg } from "../../SVG/Mobile.svg";
import { Link } from "react-router-dom";
import LinkBtn from "../Button/LinkBtn";
gsap.registerPlugin(TextPlugin);
function LandingPage({ isHomeMounted }) {
  const typeWritterText = [
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

    const bodyTL = gsap
      .timeline({
        scrollTrigger: {
          id: "bodyLandingPageBg",
          trigger: `.transformationProcess`,
          start: "center top",
          end: "center+=20% top",
          scrub: true,
        },
      })
      // .fromTo(
      //   ".HomePageContainer",
      //   {
      //     backgroundColor: "$Primary",
      //   },
      //   {
      //     backgroundColor: "$Primary",
      //   }
      // )

      .to(
        `.transformationProcess`,
        {
          opacity: 0,
        },
        "<"
      );
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
    return () => {
      ScrollTrigger.getById("bodyLandingPageBg").kill();
    };
  }, []);
  return (
    <div className={`${style.landingPageWrapper}`}>
      {/* <div
        className={`${style.landingBackground} landingBackground`}
        
        
        
      ></div> */}
      <div id="landingPage" className={style.landingPage}>
        <div className={style.landingHeading}>
          <div className={style.headingText}>
            <h1>Your partner for digital transformation</h1>
            <p id={style.myText} className={style.changingText}>
              <span id="text"></span>
              <span id="cursor">|</span>
            </p>

            <LinkBtn to="/services" className={style.servicesBtn}>
              <span>See services</span>
              <RightArrow />
            </LinkBtn>
          </div>
          <div className={style.backgroundPattern}>
            <div className={style.leftPattern}>
              <Left />
            </div>
            <div className={style.rightPattern}>
              <Right />
            </div>
          </div>
          <div className={style.mobileBackground}>
            <MobileBg />
          </div>
          {/* <div className={style.loop}>
              <div className={style.loopImg}>
                <img id="spinningCircle" src={Circle} alt="" />
                <img src={Logo} alt="" />
              </div>
            </div> */}
        </div>
        <div className={style.description}>
          <h2>We are a regional technology enterprise</h2>
          <p>
            specialized in providing Digital Transformation and complex
            technology solutions to a wide array of industries and businesses.
          </p>

          <div className={style.buttons}>
            {/* <button className={style.btn}>
              <p>Contact Us</p>
              <RightArrow />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

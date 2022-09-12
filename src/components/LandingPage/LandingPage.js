import style from "./LandingPage.module.scss";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import { useEffect, useContext } from "react";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";
import { ReactComponent as Left } from "../../SVG/left.svg";
import { ReactComponent as Right } from "../../SVG/right.svg";
import { ReactComponent as MobileBg } from "../../SVG/Mobile.svg";
import LinkBtn from "../Button/LinkBtn";
import TypewriterEffect from "../TypewriterEffect/TypewriterEffect";
import { Transition } from "react-transition-group";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(TextPlugin);
const typeWritterText = [
  "Low code",
  "Business Intelligence",
  "Business Processes",
  "Enterprise Content Management",
  "Analytics",
];

function LandingPage({ isHomeMounted }) {
  // const isMobile = width <= 999;
  useEffect(() => {
    if (!isHomeMounted) return;
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
      .to(`.transformationProcess`, { opacity: 0 }, "<");
    const patternExpandTween = gsap
      .timeline({
        delay: 0.4,
      })
      .to(".patternClip rect", { duration: 1, attr: { x: "0%" } })
      // .to("#rightPatternClip rect", { duration: 1, attr: { x: "0%" } }, "<")
      .set(`.${style.elementToReveal}`, { opacity: 1 }, "<")
      .from(
        `.${style.elementToReveal}`,
        {
          duration: 1.8,
          skewY: 7,
          y: 150,
          ease: "power4.out",
          stagger: {
            amount: 0.3,
          },
        },
        "<"
      )
      .set(`.navbar`, { opacity: 1 }, "<")
      .from(
        `.navbar`,
        {
          yPercent: -100,
          duration: 1.8,
          // Otherwise transform will mess with the position of the contactButton
          clearProps: "transform",
        },
        "<"
      );
    // .set(
    //   ".homePageWrapper",
    //   {
    //     height: "auto",
    //   },
    //   "-=1"
    // );
    return () => {
      ScrollTrigger.getById("bodyLandingPageBg").kill();
    };
  }, [isHomeMounted]);

  return (
    <div className={`${style.landingPageWrapper}`}>
      <div id="landingPage" className={style.landingPage}>
        <div className={style.landingHeading}>
          <div className={style.headingText}>
            <div className={style.elementToRevealWrapper}>
              <h1 className={style.elementToReveal}>
                Your partner for digital
              </h1>
            </div>
            <div className={style.elementToRevealWrapper}>
              <h1 className={style.elementToReveal}>transformation</h1>
            </div>
            <div className={style.elementToRevealWrapper}>
              <TypewriterEffect
                textList={typeWritterText}
                className={`${style.changingText} ${style.elementToReveal}`}
              />
            </div>
            <div className={style.elementToRevealWrapper}>
              <LinkBtn
                to="/services"
                className={`${style.servicesBtn} ${style.elementToReveal}`}
              >
                <span>See services</span>
                <RightArrow />
              </LinkBtn>
            </div>
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
        </div>
        <div className={style.description}>
          <div className={style.elementToRevealWrapper}>
            <h2 className={style.elementToReveal}>
              We are a regional technology enterprise
            </h2>
          </div>
          <div className={style.elementToRevealWrapper}>
            <p className={style.elementToReveal}>
              specialized in providing Digital Transformation and complex
              technology solutions to a wide array of industries and businesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

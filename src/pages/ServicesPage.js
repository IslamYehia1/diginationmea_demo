import style from "./ServicesPage.module.scss";
import ServicesContainer from "../components/Services/ServicesContainer";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../App";
import { useLocoscroll } from "../components/Common/useLocoscroll";
import NavigationBar from "../components/Navbar/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransformationSteps from "../components/TransformationPhases/TransformationPhases";
// import logo from "../components/Images/logo_black.png";
import logo from "../components/Images/logo_bright.png";
import { ReactComponent as Circle } from "../SVG/empty_circle.svg";
import "../global.scss";

import Footer from "../components/Footer/Footer";
import LinkBtn from "../components/Button/LinkBtn";
function Services({ onMount }) {
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 1);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  useEffect(() => {
    document.title = "Services";
    setIsMounted(true);
    gsap
      .timeline()
      .set(`.${style.elToReveal}`, { opacity: 1 })
      .from(`.${style.elToReveal}`, {
        duration: 1.8,
        skewY: 7,
        y: 150,
        ease: "power4.out",
        stagger: {
          amount: 0.3,
        },
      });
    gsap
      .timeline({
        scrollTrigger: {
          id: "servicePageBg",
          trigger: `.${style.servicesContainer}`,
          start: "30% top",
          scrub: true,
          onEnter: () => {
            setIsScrolled(true);
          },
          onLeaveBack: () => {
            setIsScrolled(false);
          },
        },
      })
      .to(
        `.servicesPage`,

        {
          backgroundColor: "#FDFFFC",
          immediateRender: false,
        }
      );
    return () => {
      ScrollTrigger.getById("servicePageBg").kill();
    };
  }, []);
  return (
    <>
      <NavigationBar
        isScrolled={isScrolled}
        bgClass={style.navBg}
        className={style.navBar}
      />
      <div
        ref={scrollRef}
        className={`${style.servicesPage} servicesPage`}
        data-scroll-container
        data-scroll-position="top"
      >
        <div className={style.headingContainer}>
          <div className={style.heading}>
            <div className={style.headingTitle}>
              <div className={style.logoContainer}>
                <Circle className={style.circle} />
                <img src={logo} alt="Digination Logo" className={style.logo} />
              </div>
              <div className={`${style.titleTextWrapper}`}>
                <div className={`${style.elToRevealWrapper}`}>
                  <h1 className={style.elToReveal}>
                    What we can do for
                    {/* <ITIcon />{" "} */}
                  </h1>
                </div>
                <div className={`${style.elToRevealWrapper} `}>
                  <h1 className={style.elToReveal}>
                    your company
                    {/* <ITIcon />{" "} */}
                  </h1>
                </div>
                <div className={style.elToRevealWrapper}>
                  <p className={`${style.titleLittleText} ${style.elToReveal}`}>
                    IT services to support the success of your business.
                  </p>
                </div>
              </div>
              <LinkBtn
                to="/contact"
                className={style.btn}
                aria-label={"Book a demo button"}
              >
                <span>Book a demo</span>
              </LinkBtn>
            </div>
          </div>
        </div>

        <ServicesContainer className={style.servicesContainer} />
        <TransformationSteps isPageMounted={isMounted} />
        <Footer />
      </div>
    </>
  );
}
export default Services;

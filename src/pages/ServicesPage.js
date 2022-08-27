import style from "./ServicesPage.module.scss";
import ServicesContainer from "../components/Services/ServicesContainer";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../App";
import { useLocoscroll } from "../components/Common/useLocoscroll";
import NavigationBar from "../components/Navbar/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransformationSteps from "../components/TransformationPhases/TransformationPhases";
import { ReactComponent as Logo } from "../SVG/black_logo.svg";
import { ReactComponent as Circle } from "../SVG/empty_circle.svg";
import "../global.scss";

import Footer from "../components/Footer/Footer";
function Services() {
  const { isAppMounted } = useContext(MyContext);
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 1);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setIsMounted(true);
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
          backgroundColor: "white",
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
                <Logo className={style.logo} />
              </div>
              <h1>
                What we can do for your company
                {/* <ITIcon />{" "} */}
              </h1>
              <p>IT services to support the success of your business.</p>
              <button className={style.btn}>
                <p>Book a demo</p>
              </button>
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

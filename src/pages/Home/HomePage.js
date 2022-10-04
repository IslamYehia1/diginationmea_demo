import Industries from "../../components/Industries/Industries";
import PageFooter from "../../components/Footer/Footer";
import Solutions from "../../components/Solutions/Solutions";
import ServicesSection from "../../components/Services/ServicesSection";
import LandingPage from "../../components/LandingPage/LandingPage";
import ProcessCircle from "../../components/ProcessCircle/ProcessCircle";
import { useLocoscroll } from "../../components/Common/useLocoscroll";
import NavigationBar from "../../components/Navbar/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { MyContext } from "../../App";
import gsap from "gsap";
import style from "./HomePage.module.scss";
import LatestNews from "../../components/LatestNews/LatestNews";
function HomePage({ onMount }) {
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 1);
  const [isHomeMounted, setIsHomeMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  useEffect(() => {
    document.title = "DiginationMea";
    setIsHomeMounted(true);
    ScrollTrigger.create({
      id: "navbarHighlight",
      trigger: `.transformationProcess`,
      start: "top+=20% top",
      endTrigger: "html",
      end: "bottom bottom",
      onEnter: () => {
        setIsScrolled(true);
      },
      onLeaveBack: () => {
        setIsScrolled(false);
      },
    });
    return () => {
      setIsHomeMounted(false);
      ScrollTrigger.getById("navbarHighlight").kill();
    };
  }, []);
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          id: "scrollTrigger3",
          trigger: `.transformationProcess`,
          start: "top+=20% top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(`.${style.HomePageContainer}`, {
        // backgroundColor: "#FDFFFC",
        backgroundColor: "#FDFFFC",
        immediateRender: false,
      });
    return () => {
      ScrollTrigger.getById("scrollTrigger3").kill();
    };
  }, []);
  return (
    <>
      <NavigationBar isScrolled={isScrolled} bgClass={style.navBg} />
      <div
        ref={scrollRef}
        className={`${style.HomePageContainer} homePage`}
        data-scroll-container
        data-scroll-position="top"
      >
        <div className={`homePageWrapper`}>
          <LandingPage isHomeMounted={isHomeMounted} />
          <ProcessCircle />
          <Industries isHomeMounted={isHomeMounted} />
          <Solutions isHomeMounted={isHomeMounted} />
          <ServicesSection isHomeMounted={isHomeMounted} />
          <LatestNews />
          <PageFooter />
        </div>
      </div>
    </>
  );
}

export default HomePage;

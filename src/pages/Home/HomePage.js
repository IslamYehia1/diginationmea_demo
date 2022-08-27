import TransformationStory from "../../components/RotatingSlider/TransformationStory";
import Industries from "../../components/Industries/Industries";
import PageFooter from "../../components/Footer/Footer";
import Solutions from "../../components/Solutions/Solutions";
import Services from "../../components/Services/Services";
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
function HomePage() {
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 1);
  const [isHomeMounted, setIsHomeMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsHomeMounted(true);
    ScrollTrigger.create({
      id: "navbarHighlight",
      trigger: `.industriesSection`,
      start: "top+=15% bottom",

      endTrigger: "html",
      end: "bottom bottom",
      onEnter: () => {
        setIsScrolled(true);
      },
      // onLeave: () => {
      //   setIsScrolled(false);
      //   highlightTween.current.reverse();
      // },
      onLeaveBack: () => {
        setIsScrolled(false);
      },
    });
    return () => {
      setIsHomeMounted(false);
    };
  }, []);
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          id: "scrollTrigger3",
          trigger: `.industriesSection`,
          start: "top+=15% bottom",
          end: "top+=30% bottom",
          scrub: true,
        },
      })
      .to(`.${style.HomePageContainer}`, {
        // backgroundColor: "#f4f4f9",
        // backgroundColor: "#F9F9F9",
        backgroundColor: "#FDFFFC",
        immediateRender: false,
      });
    return () => {
      ScrollTrigger.getById("storyTrigger3").kill();
    };
  }, []);
  return (
    <>
      <NavigationBar isScrolled={isScrolled} bgClass={style.navBg} />
      <div
        ref={scrollRef}
        className={style.HomePageContainer}
        data-scroll-container
        data-scroll-position="top"
      >
        <LandingPage isHomeMounted={isHomeMounted} />
        {/* <TransformationStory isHomeMounted={isHomeMounted} /> */}
        <ProcessCircle />
        <Industries isHomeMounted={isHomeMounted} />
        <Solutions isHomeMounted={isHomeMounted} />
        <Services isHomeMounted={isHomeMounted} />
        <LatestNews />
        <PageFooter />
      </div>
    </>
  );
}

export default HomePage;

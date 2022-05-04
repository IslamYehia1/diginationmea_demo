import NavigationBar from "./components/Navbar/Navbar";
import React, { useRef, useEffect, useState, createContext } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
// import "locomotive-scroll.css";
import "./fonts/MYRIADPRO-REGULAR.OTF";
import "./fonts/MYRIADPRO-SEMIBOLD.OTF";
import HomePage from "./pages/Home/HomePage";
import LocomotiveScroll from "locomotive-scroll";
import "./App.less";
import "./global.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./pages/ServicesPage";
import { useLocation } from "react-router-dom";
import { useLocoscroll } from "./components/Common/useLocoscroll";
gsap.registerPlugin(ScrollTrigger);

export const MyContext = createContext();
function App() {
  // const scrollRef = useRef(document.querySelector(".App"));
  const scrollRef = useRef(null);
  const navRef = useRef();
  let nav;
  let [isNavScrolled, setIsNavScrolled] = useState(false);
  let [isMounted, setIsMounted] = useState(false);
  let location = useLocation();

  // const locoScroll = useLocoscroll(scrollRef);
  scrollRef.current = document.querySelector("[data-scroll-container]");
  const [isAppMounted, setIsAppMounted] = useState(false);
  let tltransition = useRef(null);

  useEffect(() => {
    nav = document.querySelector(".navBar");
    const $img2 = document.querySelector(".image2");
    const $logo = document.querySelector(".transition__logo");
    const $frameBlack = document.querySelector(".page-transition__black");
    const $frameRed = document.querySelector(".page-transition__red");
    const $button = document.querySelector("#button");

    tltransition.current = gsap
      .timeline({ paused: true })
      .set(".transitionDiv", { autoAlpha: 1 })
      .fromTo(
        $frameRed,
        { scaleX: 0 },
        {
          duration: 2.2,
          scaleX: 1,
          transformOrigin: "left",
          ease: "Power4.easeInOut",
        }
      )
      .fromTo(
        $frameBlack,
        { scaleX: 0 },
        {
          duration: 2.2,
          scaleX: 1,
          transformOrigin: "left",
          ease: "Power4.easeInOut",
        },
        0.2
      )
      .fromTo(
        $logo,
        { xPercent: -100, autoAlpha: 0 },
        { duration: 1.6, xPercent: 0, autoAlpha: 1, ease: "Power4.easeInOut" },
        0.7
      )
      .set($frameRed, { scaleX: 0 })
      // .set($img2, { autoAlpha: 0 })
      .to($frameBlack, {
        duration: 2.2,
        scaleX: 0,
        transformOrigin: "right",
        ease: "Power4.easeInOut",
      })
      .to($logo, { duration: 0.2, autoAlpha: 0 }, "-=1.2");

    setIsAppMounted(true);
  }, []);

  return (
    <>
      <div ref={scrollRef} className="App">
        <div className="overlay" />
        <MyContext.Provider value={{ scrollRef, isAppMounted }}>
          <NavigationBar
            isScrolled={isNavScrolled}

            // transitionController={tltransition}
            // hanldeMouseLeave={handleReverse}
            // handleMouseEnter={handleHover}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/blog" component={Blog} /> */}
            {/* <Route path="/contact" component={Contact} /> */}
          </Routes>
        </MyContext.Provider>
      </div>
      <div class="page-transition__red transitionDiv"></div>
      <div class="page-transition__black transitionDiv"></div>
      <div class="transition__logo transitionDiv">I'M LOGO</div>
    </>
  );
}

export default App;

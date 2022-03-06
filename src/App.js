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

gsap.registerPlugin(ScrollTrigger);

export const MyContext = createContext();
function App() {
  const scrollRef = useRef(document.querySelector(".App"));
  const navRef = useRef();
  let nav;
  let [isNavScrolled, setIsNavScrolled] = useState(false);
  let [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    nav = document.querySelector(".navBar");
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: scrollRef.current.style.transform ? "transform" : "fixed",
    });
    // temp("start");
    // ScrollTrigger.create({
    //   trigger: ".landingPage",
    //   start: "top+=80px top",
    //   // markers: true,
    //   scroller: scrollRef.current,
    //   onEnter: () => {
    //     setIsNavScrolled(true);
    //   },

    //   onLeaveBack: () => {
    //     setIsNavScrolled(false);
    //   },
    // });
    setIsMounted(true);
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="App" ref={scrollRef} data-scroll-container>
          <MyContext.Provider value={scrollRef.current}>
            <NavigationBar
              isScrolled={isNavScrolled}
              // hanldeMouseLeave={handleReverse}
              // handleMouseEnter={handleHover}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    data-scroll-section
                    data-scroll-speed="1"
                    data-scroll-position="top"
                  />
                }
              />
              {/* <Route path="/about" component={About} /> */}
              {/* <Route path="/blog" component={Blog} /> */}
              {/* <Route path="/contact" component={Contact} /> */}
            </Routes>
          </MyContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

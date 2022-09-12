import React, { useRef, useEffect, useState, createContext } from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader/PageLoader";
import "./global.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import WIP from "./pages/WIP";
import Partners from "./pages/Partners";
import { useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);
const HomePage = React.lazy(() => import("./pages/Home/HomePage"));
const Services = React.lazy(() => import("./pages/ServicesPage"));
const Contact = React.lazy(() => import("./pages/Contact"));
export const MyContext = createContext();
function App() {
  const scrollRef = useRef(null);
  const location = useLocation();
  scrollRef.current = document.querySelector("[data-scroll-container]");
  const [isAppMounted, setIsAppMounted] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const pageTransitionOut = useRef(null);
  const pageTransitionIn = useRef(null);
  const displayLocationSetter = useRef();
  const navigate = useNavigate();
  displayLocationSetter.current = () => {
    setDisplayLocation(location);
  };
  // Each component decides when to the page is loaded
  useEffect(() => {
    pageTransitionOut.current = gsap
      .timeline({
        paused: true,
      })
      .to(`.overlay`, {
        delay: 0.3,
        duration: 0.5,
        yPercent: -101,
        ease: "Power4.out",
      })
      .set("body", {
        overflow: "visible",
      });

    pageTransitionIn.current = gsap
      .timeline({ paused: true })
      .set(`.loaderTriangle`, {
        opacity: 0,
      })
      .set("body", {
        overflow: "hidden",
      })
      .fromTo(
        `.overlay`,
        {
          opacity: 1,
          yPercent: -101,
          immediateRender: false,
        },
        {
          immediateRender: false,
          yPercent: 0,
          duration: 0.4,
          ease: "Power4.out",
        }
      )
      .to(`.loaderTriangle`, {
        opacity: 1,
      })
      .add(() => {
        displayLocationSetter.current();
      });
  }, []);

  useEffect(() => {
    if (location !== displayLocation) {
      pageTransitionOut.current.kill();
      if (!pageTransitionIn.current.isActive())
        pageTransitionIn.current.play(0);
    } else {
    }
  }, [location, displayLocation]);

  const playPageTransitionOut = useCallback(() => {
    if (pageTransitionOut.current)
      pageTransitionOut.current.progress(0).restart();
  }, [pageTransitionOut.current]);
  return (
    <>
      <div ref={scrollRef} className="App">
        <div className="overlay">
          <div className="transitionPageContainer">
            <div className="loader">
              <div className="loaderTriangle">
                <svg viewBox="0 0 86 80">
                  <polygon points="43 8 79 72 7 72"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <MyContext.Provider value={{ scrollRef, isAppMounted }}>
          <Routes location={displayLocation}>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<PageLoader />}>
                  <HomePage onMount={playPageTransitionOut} />
                </React.Suspense>
              }
            />
            <Route
              path="/services"
              element={
                <div>
                  <React.Suspense fallback={<PageLoader />}>
                    <Services onMount={playPageTransitionOut} />
                  </React.Suspense>
                </div>
              }
            />
            <Route
              path="/partners"
              element={
                <React.Suspense fallback={<PageLoader />}>
                  <Partners onMount={playPageTransitionOut} />
                </React.Suspense>
              }
            />
            {/* <Route path="/blog" component={Blog} /> */}
            <Route
              path="/contact"
              element={
                <React.Suspense fallback={<PageLoader />}>
                  <Contact onMount={playPageTransitionOut} />
                </React.Suspense>
              }
            />
            <Route path="/industries" element={<WIP />} />
            <Route
              path="/news"
              element={<WIP onLoad={playPageTransitionOut} />}
            />
            <Route
              path="/careers"
              element={<WIP onLoad={playPageTransitionOut} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MyContext.Provider>
      </div>
    </>
  );
}

export default App;

import NavigationBar from "./components/Navbar/Navbar";
import React, { useRef, useEffect } from "react";

// import "locomotive-scroll.css";
import "./fonts/MYRIADPRO-REGULAR.OTF";
import "./fonts/MYRIADPRO-SEMIBOLD.OTF";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./pages/Home/HomePage";
import LocomotiveScroll from "locomotive-scroll";
import "./App.less";
import "./global.scss";
function App() {
  const scrollRef = useRef();
  useEffect(() => {
    new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
    });
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="App" ref={scrollRef} data-scroll-container>
        <HomePage
          data-scroll-section
          data-scroll-speed="1"
          data-scroll-position="top"
        />
      </div>
    </>
  );
}

export default App;

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../App";

gsap.registerPlugin(ScrollTrigger);

export function useLocoscroll(scrollRef, multiplier) {
  let locoScrollRef = useRef(null);
  // scrollRef.current = document.querySelector("[data-scroll-container]");
  const location = useLocation();
  useEffect(() => {
    if (!(scrollRef && scrollRef.current)) return;
    locoScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: multiplier,
      mobile: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });
    locoScrollRef.current.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScrollRef.current.scrollTo(value, 0, 0)
          : locoScrollRef.current.scroll.instance.scroll.y;
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
    ScrollTrigger.addEventListener("refresh", () =>
      locoScrollRef.current.update()
    );
    ScrollTrigger.refresh(true);

    ScrollTrigger.defaults({ scroller: scrollRef.current });
    const resizeObserver = new ResizeObserver((entries) => {
      ScrollTrigger.refresh(true);
      locoScrollRef.current.update();

      // locoScrollRef.current.update();
      // console.log("Body height changed:", entries[0].target.clientHeight)
    });

    // start observing a DOM node
    resizeObserver.observe(document.body);
    return () => {
      locoScrollRef.current.destroy();
      resizeObserver.disconnect();
    };
  }, [scrollRef.current]);

  useEffect(() => {
    if (!locoScrollRef.current) return;
    locoScrollRef.current.update();
    ScrollTrigger.refresh(true);
  }, [location.pathname]);
  return locoScrollRef.current;
}

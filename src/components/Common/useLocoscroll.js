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

gsap.registerPlugin(ScrollTrigger);

export function useLocoscroll(scrollRef, multiplier) {
  let locoScrollRef = useRef(null);
  // scrollRef.current = document.querySelector("[data-scroll-container]");
  useEffect(() => {
    if (!(scrollRef && scrollRef.current)) return;
    locoScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: multiplier,
      getSpeed: true,
      getDirection: true,
      reloadOnContextChange: true,
      smartphone: {
        smooth: false,
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
    const update = () => {
      if (locoScrollRef.current) locoScrollRef.current.update();
    };
    ScrollTrigger.addEventListener("refresh", update);
    ScrollTrigger.refresh(true);
    ScrollTrigger.defaults({ scroller: scrollRef.current });
    // const resizeObserver = new ResizeObserver((entries) => {
    //   ScrollTrigger.refresh(true);
    //   if (locoScrollRef.current && locoScrollRef.current.update)
    //     locoScrollRef.current.update();
    //   // locoScrollRef.current.update();
    //   // console.log("Body height changed:", entries[0].target.clientHeight)
    // });

    // start observing a DOM node
    // resizeObserver.observe(document.body);
    return () => {
      locoScrollRef.current.destroy();
      // resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refresh", update);
    };
  }, [scrollRef.current]);

  // useEffect(() => {
  //   if (!locoScrollRef.current) return;
  //   locoScrollRef.current.update();
  //   ScrollTrigger.refresh(true);
  //   console.log("WHY TRIGGERED HHAAAH?");
  //   return () => {
  //     if (locoScrollRef.current) locoScrollRef.current.destroy();
  //     // if (resizeObserver) resizeObserver.disconnect();
  //   };
  // }, [location]);
  return locoScrollRef.current;
}

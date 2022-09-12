import { useEffect, useRef } from "react";
import gsap from "gsap";

function TypewriterEffect({ textList, className }) {
  const mainTimeline = useRef(null);
  mainTimeline.current = gsap.timeline({ repeat: -1, delay: 2 });
  useEffect(() => {
    gsap.fromTo(
      "#cursor",
      {
        opacity: 0,
        // x: -10
        // duration: 0.5,
      },
      // { opacity: 1, duration: 0.7, repeat: -1, ease: "stepssteps(1)" }
      {
        opacity: 1,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.easeOut",
        repeatDelay: 0.2,
      }
    );

    textList.forEach((text, index) => {
      let tween = gsap
        .timeline({ yoyo: true, repeat: 1, repeatDelay: 2 })
        .to("#text", {
          text: {
            value: text,
          },
          duration: 0.08 * text.length,
          delay: 1,
          ease: "linear",
        });
      mainTimeline.current.add(tween, index * tween.totalDuration());
    });
  }, [textList]);

  return (
    <p className={className}>
      <span id="text"></span>
      <span id="cursor">|</span>
    </p>
  );
}

export default TypewriterEffect;

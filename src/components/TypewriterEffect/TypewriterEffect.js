import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin);

function TypewriterEffect({ textList, className, repeat }) {
  const mainTimeline = useRef(null);
  const typewriterRef = useRef(null);

  useEffect(() => {
    let to;
    if (to) clearTimeout(to);

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
    let prevTweenDuration = 0;
    to = setTimeout(() => {
      mainTimeline.current = gsap.timeline({
        repeat: repeat ? repeat : -1,
        scrollTrigger: {
          trigger: typewriterRef.current,
          toggleActions: "play pause play pause",
        },
      });
      textList.forEach((text) => {
        console.log(prevTweenDuration);
        let tween = gsap
          .timeline({
            yoyo: true,
            repeat: 1,
            repeatDelay: 2,
          })
          .fromTo(
            "#text",
            {
              text: {
                value: "",
              },
            },
            {
              text: {
                value: text,
              },
              delay: 0.1,
              duration: 0.08 * text.length,
              ease: "linear",
            }
          );
        mainTimeline.current.add(tween);
      });
    }, 100);
  }, [textList]);

  return (
    <p ref={typewriterRef} className={className}>
      <span id="text"></span>
      <span id="cursor">|</span>
    </p>
  );
}

export default TypewriterEffect;

import style from "./PhaseTitle.module.scss";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
class PhaseTitle extends React.Component {
  constructor(props) {
    super(props);
    // this.currentIndex = React.createRef(null);
  }
  componentDidMount() {
    var i = 0;

    const titleListSplit = Splitting({
      /* target: String selector, Element, Array of Elements, or NodeList */
      target: "[data-splitting]",
      /* by: String of the plugin name */
      by: "words",
      /* key: Optional String to prefix the CSS variables */
      key: null,
    });
    const titleList2 = gsap.utils.toArray(`.${style.phasesList} li`);

    gsap.registerEffect({
      name: "rotateIn",
      extendTimeline: true,
      defaults: {
        duration: 1,
        rotationY: 0,
        rotationX: 0,
        transformOrigin: "50% 50%",
        ease: "back",
        parent: `.${style.wrap}`,
      },

      effect: (targets, config, onComplete) => {
        gsap.set(config.parent, { perspective: 800 });

        let tl = gsap.timeline({ onComplete: onComplete });
        tl.from(targets, {
          duration: config.duration,
          rotationY: config.rotationY,
          rotationX: config.rotationX,
          transformOrigin: config.transformOrigin,
          ease: config.ease,
          stagger: {
            each: 0.06,
          },
        });

        tl.from(
          targets,
          {
            duration: 0.4,
            autoAlpha: 0,
            ease: "none",
            stagger: {
              each: 0.05,
            },
          },
          0
        );

        return tl;
      },
    });

    gsap.registerEffect({
      name: "rotateOut",
      extendTimeline: true,
      defaults: {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        transformOrigin: "50% 50%",
        ease: "power1.in",
        parent: `.${style.wrap}`,
      },

      effect: (targets, config) => {
        gsap.set(config.parent, { perspective: 800 });

        let tl = gsap.timeline();
        tl.to(targets, {
          x: config.x,
          y: config.y,
          rotationY: config.rotationY,
          rotationX: config.rotationX,
          rotationZ: config.rotationZ,
          transformOrigin: config.transformOrigin,
          ease: config.ease,
          stagger: {
            each: 0.04,
          },
        });

        tl.to(
          targets,
          {
            duration: 0.45,
            opacity: 0,
            ease: "none",
            stagger: {
              amount: 0.02,
            },
          },
          0
        );

        return tl;
      },
    });
    gsap.set(titleList2[0], { autoAlpha: 1 });
    gsap.effects.rotateIn(titleListSplit[0].words, {
      rotationX: 90,
      transformOrigin: "100% 0",
      ease: "back(2.3)",
      onComplete: () => splitElements(),
    });

    function splitElements() {
      i =
        (i + 1) % titleListSplit.length == 0
          ? 1
          : (i + 1) % titleListSplit.length;
      console.log(i);
      let length = titleListSplit.length;
      let previousTitleIndex = i - 1 < 0 ? length - 1 : i - 1;
      console.log(previousTitleIndex, i);
      gsap.set(titleList2[i], { autoAlpha: 1 });
      const titlesTl = gsap.timeline({
        onComplete: () => {
          splitElements();
        },
      });

      titlesTl
        .rotateOut(
          titleListSplit[previousTitleIndex].words,
          {
            y: 20,
            rotationX: -100,
            transformOrigin: "100% 100%",
          },
          "+3.90"
        )
        .rotateIn(
          titleListSplit[i].words,
          {
            rotationX: 90,
            transformOrigin: "100% 0",
            ease: "back(2.3)",
          },
          "-=0.38"
        );
      // }
    }
    splitElements();
  }
  render() {
    return (
      <div className={`${this.props.className} ${style.wrap}`}>
        <ul className={style.phasesList}>
          <li data-splitting>Digital presence?</li>
          <li data-splitting>Isolated </li>
          <li data-splitting>Integrated </li>
          <li data-splitting>Synchronized </li>
          <li data-splitting>Digitally mature</li>
        </ul>
      </div>
    );
  }
}

export default PhaseTitle;

import style from "./PhaseTitle.module.scss";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
class SectionsTitles extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentIndex === 0) {
    }
    if (this.props.currentIndex !== prevProps.currentIndex) {
      gsap.set(this.titleList2[this.props.currentIndex], { autoAlpha: 1 });
      const tl = gsap.timeline({});
      if (prevProps.currentIndex >= 0) {
        tl.rotateOut(this.titleListSplit[prevProps.currentIndex].words, {
          y: 20,
          rotationX: -100,
          transformOrigin: "100% 100%",
        })
          .set(this.titleListSplit[prevProps.currentIndex].words, {
            clearProps: "all",
          })
          .set(this.titleList2[prevProps.currentIndex], { autoAlpha: 0 });
      }

      tl.rotateIn(
        this.titleListSplit[this.props.currentIndex].words,
        {
          rotationX: 90,
          transformOrigin: "100% 0",
          ease: "back(2.3)",
        },
        "-=0.38"
      );
    }
  }
  componentDidMount() {
    var i = -1;
    this.titleList2 = gsap.utils.toArray(`.${style.phasesList} li`);
    gsap.set(this.titleList2[this.props.currentIndex], { autoAlpha: 1 });
    this.titleListSplit = Splitting({
      /* target: String selector, Element, Array of Elements, or NodeList */
      target: "[data-splitting]",
      /* by: String of the plugin name */
      by: "words",
      /* key: Optional String to prefix the CSS variables */
      key: null,
    });
    // gsap.set(this.titleList2[this.props.currentIndex], { autoAlpha: 1 });

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
            autoAlpha: 0,
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
  }
  render() {
    return (
      <div className={`${this.props.className} ${style.wrap}`}>
        <ul className={style.phasesList}>
          <li data-splitting>Outsystems</li>
          <li data-splitting>Altyrex</li>
          <li data-splitting>powerBI</li>
          <li data-splitting>Qlik </li>
          <li data-splitting>Chatbot </li>
          <li data-splitting>openText</li>
        </ul>
      </div>
    );
  }
}

export default SectionsTitles;

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import style from "./Labels.module.scss";
class Labels extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var i = -1;
    this.titleList2 = gsap.utils.toArray(`.${style.labelsList} li`);
    // gsap.set(this.titleList2[this.props.currentIndex], { autoAlpha: 1 });
    // this.titleListSplit = Splitting({
    //   /* target: String selector, Element, Array of Elements, or NodeList */
    //   target: "[data-splitting]",
    //   /* by: String of the plugin name */
    //   by: "words",
    //   /* key: Optional String to prefix the CSS variables */
    //   key: null,
    // });
    // gsap.set(this.titleList2[this.props.currentIndex], { autoAlpha: 1 });
    const labelsTl = gsap.timeline({ repeat: -1 });

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

      effect: (targets, config) => {
        gsap.set(config.parent, { perspective: 800 });

        let tl = gsap.timeline();
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
    gsap.set(this.titleList2, { autoAlpha: 1 });
    this.titleList2.forEach((element, dex) => {
      let split = Splitting({
        /* target: String selector, Element, Array of Elements, or NodeList */
        target: element,
        //   target: "[data-splitting]",

        /* by: String of the plugin name */
        by: "words",
        /* key: Optional String to prefix the CSS variables */
        key: null,
      })[0];
      labelsTl
        .rotateIn(
          split.words,
          {
            rotationX: 90,
            transformOrigin: "100% 0",
            ease: "back(2.3)",
          },
          dex > 0 ? "-=0.38" : 0
        )
        .rotateOut(
          split.words,
          {
            y: 20,
            rotationX: -100,
            transformOrigin: "100% 100%",
          },
          "+=2"
        );
    });
  }
  render() {
    return (
      <div className={`${this.props.className} ${style.wrap}`}>
        <ul className={style.labelsList}>
          <li data-splitting>extensive experience of Low code</li>
          <li data-splitting>Enterprise Content Management </li>
          <li data-splitting>Business Processes </li>
          <li data-splitting> Business Intelligence </li>
          <li data-splitting>Analytics</li>
        </ul>
      </div>
    );
  }
}

export default Labels;

import { useState, useEffect, useRef, useCallback } from "react";
import style from "./dropdown.module.scss";
import gsap from "gsap";
function Dropdown({ children, isOpen, onOpen, onClose, id, link }) {
  const [openState, setOpenState] = useState(false);
  const menuRef = useRef(null);
  const openAnimation = useRef(null);
  const closeAnimation = useRef(null);
  const ulRef = useRef(null);
  const backgroundRef = useRef(null);
  // useEffect(() => {
  //   if (!onOpen || !onClose) return;
  //   if (openState) onOpen();
  //   else onClose();
  // }, [openState, onOpen, onClose]);
  function onReverse(func, onlyAfterComplete) {
    let time = 0,
      reversed;
    return function () {
      let t = this.time(),
        r = t < time;
      r &&
        !reversed &&
        (!onlyAfterComplete || time === this.duration()) &&
        func.call(this);
      time = t;
      reversed = r;
    };
  }
  useEffect(() => {
    gsap.set(menuRef.current, { scaleY: 0, autoAlpha: 1 });
    openAnimation.current = gsap
      .timeline({
        paused: true,
        // onReverse: () => {
        //   console.log("REVERSED");
        //   gsap.set(menuRef.current, {
        //     zIndex: -1,
        //   });
        // },
        // onReverseComplete: () => {
        //   if (onClose) onClose(id);
        // },
        onUpdate: onReverse(() => {
          gsap.set(menuRef.current, {
            zIndex: -1,
          });
        }),
        onReverseComplete: () => {
          if (onClose) onClose(id);
        },
      })
      .set(menuRef.current, {
        zIndex: 100,
      })
      .add(() => {
        if (onOpen) onOpen(id);
      })
      // .fromTo(
      //   menuRef.current,
      //   {
      //     zIndex: -1,
      //   },
      //   {
      //     duration: 0,
      //     zIndex: 9,
      //   }
      // )
      // .to(".navbarBackground", {
      //   boxShadow: "none",
      // })
      .to(menuRef.current, {
        delay: 0.1,
        scaleY: "1",
        // ease: "expo.out",
        ease: "circ.out",
        transformOrigin: "top center",
        duration: 0.4,
      })
      .fromTo(
        ulRef.current,
        {
          autoAlpha: 0,
          translateY: "-1.33rem",
        },
        {
          autoAlpha: 1,
          ease: "circ.out",
          duration: 0.4,
          translateY: "0",
        },
        "<+=50%"
        // "<+=50%"
      );

    // closeAnimation.current = gsap
    //   .timeline({
    //     paused: true,

    //     onComplete: () => {
    //       if (onClose) onClose(id);
    //     },
    //   })
    //   .to(menuRef.current, {
    //     zIndex: -1,
    //   })
    //   .to(
    //     menuRef.current,
    //     {
    //       scaleY: 0,
    //       transformOrigin: "top center",
    //       ease: "power4.in",
    //       // ease: "expo.in",
    //       duration: 0.4,
    //     }
    //     // "<+=50"
    //   )
    //   .to(
    //     ulRef.current,
    //     {
    //       autoAlpha: 0,
    //       duration: 0.2,
    //       translateY: "-0.3rem",
    //     },
    //     "<"
    //   );

    // gsap.set(menuRef.current, {
    //   scaleY: "0",
    //   visibility: "visible",
    //   transformOrigin: "top center",
    // });
  }, []);
  const openDropdown = useCallback(() => {
    // if (closeAnimation.current) closeAnimation.current.kill();
    if (openAnimation.current) openAnimation.current.play();
  }, [closeAnimation.current, openAnimation.current]);
  const closeDropDown = useCallback(() => {
    // if (openAnimation.current) openAnimation.current.kill();
    // if (closeAnimation.current) closeAnimation.current.restart();
    if (openAnimation.current) openAnimation.current.reverse();
  }, [closeAnimation.current, openAnimation.current]);
  return (
    <div
      id={`${id}`}
      className={style.dropDown}
      onMouseLeave={() => closeDropDown()}
    >
      <div
        className={style.link}
        onMouseEnter={() => {
          openDropdown();
        }}
      >
        {link}
      </div>
      <div ref={menuRef} className={`${style.menu}`}>
        <div ref={backgroundRef} className={style.dropDownBackground}></div>
        <ul ref={ulRef}>{children}</ul>
      </div>
    </div>
  );
}

export default Dropdown;

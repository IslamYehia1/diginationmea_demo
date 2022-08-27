import { useState, useEffect, useRef, useCallback } from "react";
import style from "./dropdown.module.scss";
import gsap from "gsap";
import { ReactComponent as CaretDownOutlined } from "../../SVG/caretDown.svg";

function Dropdown({ children, onOpen, onClose, id, link }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const openAnimation = useRef(null);
  const ulRef = useRef(null);
  const backgroundRef = useRef(null);
  const caretRef = useRef(null);
  const isMobile = width <= 999;
  function handleResize() {
    setWidth(window.innerWidth <= 999);
  }
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
    window.addEventListener("resize", handleResize);
    gsap.set(menuRef.current, { scaleY: 0, autoAlpha: 1 });
    const q = gsap.utils.selector(caretRef);
    openAnimation.current = gsap
      .timeline({
        paused: true,
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

      .to(menuRef.current, {
        delay: 0.1,
        scaleY: "1",
        // ease: "expo.out",
        ease: "circ.out",
        transformOrigin: "top center",
        duration: 0.4,
      })
      .to(
        q("svg"),
        {
          transformOrigin: "50% 50%",
          rotate: "180deg",
          ease: "circ.out",
          duration: 0.4,
        },
        "<"
      )
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
      )
      .set(`.${style.overlaay}`, {
        display: "block",
      })
      .to(`.${style.overlaay}`, { opacity: 0.3 });
  }, []);

  return (
    <>
      <div className={style.overlaay}></div>
      <div
        id={`${id}`}
        className={style.dropDown}
        onMouseLeave={() => {
          openAnimation.current.reverse();
          // closeDropDown();
        }}
      >
        <div
          className={style.link}
          onMouseEnter={() => {
            // openDropdown();
            openAnimation.current.play();
          }}
          onClick={(e) => {
            if (openAnimation.current.progress() > 0)
              openAnimation.current.reverse();
            else openAnimation.current.play();
          }}
        >
          {link}
          <CaretDownOutlined ref={caretRef} />
        </div>
        <div ref={menuRef} className={`${style.menu}`}>
          <div ref={backgroundRef} className={style.dropDownBackground}></div>
          <ul ref={ulRef}>{children}</ul>
        </div>
      </div>
    </>
  );
}

export default Dropdown;

import { useEffect, useState, useRef, useCallback, useContext } from "react";
import NormalLogo from "./LogoDigination.png";
import WhiteLogo from "./whiteLogo1.png";
import commonNavStyle from "./commonNavbar.module.scss";
import style from "./MobileNavbar.module.scss";
import { ReactComponent as ContactIcon } from "../../SVG/send.svg";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import LinkBtn from "../Button/LinkBtn";
gsap.registerPlugin(CustomEase);

gsap.registerPlugin(ScrollTrigger);
function MobileNavbar({ bgClass, onHighlight, onUnHighlight, links }) {
  const MobileMenuIconRef = useRef();
  const mobileNavRef = useRef(null);
  const highlightTween = useRef(null);
  const [click, setClick] = useState(false);

  const handleClick = (e) => {
    setClick(!click);
    MobileMenuIconRef.current.classList.toggle("opened");
    MobileMenuIconRef.current.setAttribute(
      "aria-expanded",
      MobileMenuIconRef.current.classList.contains("opened")
    );
  };
  useEffect(() => {
    highlightTween.current = gsap.timeline({ paused: true });

    mobileNavRef.current = gsap
      .timeline({
        paused: true,
        onReverseComplete: () => {
          if (onUnHighlight) onUnHighlight();
        },
        onStart: () => {
          if (onHighlight) onHighlight();
        },
      })

      .fromTo(
        `.${commonNavStyle.navBackground}`,
        {
          height: "4.66667rem",
        },
        {
          duration: 0.3,
          height: "100vh",
          transformOrigin: "50% 0%",
          ease: "circ.in",
        }
      )
      .fromTo(
        `.${style.mobileMenuWrapper}`,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.2 }
      )
      .fromTo(
        "body",
        { overflow: "visible" },
        { immediateRender: "false", overflow: "hidden" }
      );
  }, [onHighlight, onUnHighlight]);

  useEffect(() => {
    if (click) {
      mobileNavRef.current.restart();
    }
    if (!click) {
      mobileNavRef.current.reverse();
    }
  }, [click]);

  return (
    <>
      <div className={`${commonNavStyle.navBackground} ${bgClass}`}></div>
      <Link
        to="/"
        className={`${style.logo}`}
        aria-label="Go to contact us page"
      >
        <img
          alt="Digination Logo"
          src={NormalLogo}
          className={`${commonNavStyle.coloredLogo}`}
        />
        <img
          alt="Digination Logo"
          src={WhiteLogo}
          className={`${commonNavStyle.whiteLogo}`}
        />
      </Link>
      <div className={style.topContactBtn}>
        <Link to="/contact" aria-label="Go to contact us page">
          <ContactIcon className={style.topContactIcon} />
        </Link>
        <div className={`${style.navIcon}`} onClick={handleClick}>
          <div
            className={`${style.burgerMenu} ${style.menuIcon} ${style.burgerMenuClosed}`}
            onClick={() => {
              MobileMenuIconRef.current.classList.toggle(
                `${style.burgerMenuClosed}`
              );
              MobileMenuIconRef.current.classList.toggle(
                `${style.burgerMenuOpened}`
              );
            }}
            ref={MobileMenuIconRef}
          >
            <div className={style.bar}></div>
            <div className={style.bar}></div>
            <div className={style.bar}></div>
          </div>
        </div>
      </div>
      <div className={`${style.mobileMenuWrapper}`}>
        <ul className={`${style.navMenu}`}>
          {links.map(({ path, title, dropDown }, index) => {
            return (
              <li
                key={index}
                className={`${style.navItem} ${
                  dropDown ? style.hasDropDown : ""
                }`}
              >
                <Link
                  to={path}
                  className={style.navLink}
                  aria-label={`${title} page link`}
                >
                  {title}
                </Link>
                {dropDown && (
                  <div className={style.mobileList}>
                    <ul className={style.mobileSublist}>
                      {dropDown.map(({ title, path }, index) => {
                        return (
                          <li key={index}>
                            <Link aria-label={`${title} page link`} to={path}>
                              {title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <LinkBtn
          id="contactButton"
          Icon={ContactIcon}
          className={`${style.contactButton}`}
          to="/contact"
          aria-label="Go to contact us page"
        >
          Contact Us
          <ContactIcon />
        </LinkBtn>
      </div>
    </>
  );
}

export default MobileNavbar;

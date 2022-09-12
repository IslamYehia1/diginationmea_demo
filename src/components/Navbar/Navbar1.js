import { useEffect, useState, useRef, useCallback, useContext } from "react";
import NormalLogo from "./LogoDigination.png";
import WhiteLogo from "./whiteLogo1.png";
import style from "./Navbar.module.scss";
import { ReactComponent as ContactIcon } from "../../SVG/send.svg";
import { ReactComponent as MenuIcon } from "../../SVG/menu.svg";
import { ReactComponent as MenuCircle } from "../../SVG/menuCircle.svg";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import LinkBtn from "../Button/LinkBtn";

gsap.registerPlugin(CustomEase);

gsap.registerPlugin(ScrollTrigger);

const links = [
  // { path: "/", title: "Home" },
  // {
  //   path: "/about",
  //   title: "About Us",
  // },
  {
    path: "/services",
    title: "Services",
  },
  {
    path: "/services",
    title: "Solutions",
    dropDown: [
      { title: "Business Application", path: "/services" },
      { title: "Business Intelligence", path: "/services" },
      { title: "Infrastructure & Operations", path: "/services" },
      { title: "AI Solutions", path: "/services" },
    ],
  },
  {
    path: "/industries",
    title: "Industries",
    dropDown: [
      { title: "Financial sector", path: "/industries" },
      { title: "Healthcare", path: "/industries" },
      { title: "Insurance", path: "/industries" },
      { title: "Education", path: "/industries" },
      { title: "Oil and gas", path: "/industries" },
      { title: "Communication", path: "/industries" },
      { title: "Government", path: "/industries" },
    ],
  },
  // {
  //   path: "/parteners",
  //   title: "Parteners",
  // },
  // {
  //   path: "/clients",
  //   title: "Clients",
  // },
  {
    path: "/careers",
    title: "Careers",
  },
];

function NavBar({ isScrolled, bgClass, className, normalLogoOnly }) {
  const [click, setClick] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const navRef = useRef();
  const MobileMenuIconRef = useRef();
  const isMobile = width <= 999;
  const overlayTween = useRef(null);
  const mobileNavRef = useRef(null);
  const highlightTween = useRef(null);
  const timeOut = useRef(null);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    highlightTween.current = gsap
      .timeline({ paused: true })
      .to(`.${style.navBackground}`, {
        immediateRender: false,
        background: "hsla(100, 100%, 99% , 0.904)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.034)",
        ease: "none",
        duration: 0.2,
      })
      .set(`.${style.navbar}`, {
        color: "#1D2B28",
      })
      .set(`.${style.contactBtnWrapper}`, {
        color: "#66B186",
      })
      .set(`.${style.contactButton}`, {
        backgroundColor: "#66B186",
      })
      .set(`.${style.normalLogo}`, {
        visibility: "visible",
        filter: "initial",
      });
    if (!normalLogoOnly) {
      highlightTween.current.set(`.${style.whiteLogo}`, {
        visibility: "hidden",
      });
    }

    overlayTween.current = gsap.timeline({
      paused: true,
    });

    mobileNavRef.current = gsap
      .timeline({ paused: true })
      .fromTo(
        `.${style.navBackground}`,
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
        `.${style.navMenu}`,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.2 }
      )
      .fromTo("body", { overflow: "visible" }, { overflow: "hidden" });
    if (!isMobile) {
      setClick(false);
    }

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      highlightTween.current.seek(0).pause().kill();
      mobileNavRef.current.seek(0).pause().kill();
      overlayTween.current.seek(0).pause().kill();
    };
  }, [isMobile]);
  const handleClick = (e) => {
    setClick(!click);
    MobileMenuIconRef.current.classList.toggle("opened");
    MobileMenuIconRef.current.setAttribute(
      "aria-expanded",
      MobileMenuIconRef.current.classList.contains("opened")
    );
  };
  useEffect(() => {
    if (isScrolled) highlightTween.current.play();
    else highlightTween.current.reverse();
  }, [isScrolled, isMobile]);

  useEffect(() => {
    if (!isMobile) {
      gsap.set(`.${style.navMenu}`, {
        autoAlpha: 1,
      });
      mobileNavRef.current.seek(0).pause();
    }
    if (click && isMobile) {
      mobileNavRef.current.play();
    }
    if (!click && isMobile) {
      gsap.set(`.${style.navMenu}`, {
        autoAlpha: 0,
      });
      mobileNavRef.current.reverse();
    }
  }, [click, isMobile]);

  return (
    <div style={{ zIndex: 20 }}>
      <nav
        onMouseOver={() => {
          if (isMobile) return;
          highlightTween.current.play();
          clearTimeout(timeOut.current);
        }}
        onMouseLeave={() => {
          if (isMobile) return;
          if (!isScrolled) {
            clearTimeout(timeOut.current);
            timeOut.current = setTimeout(() => {
              highlightTween.current.reverse();
            }, 700);
          }
        }}
        ref={navRef}
        className={`${style.navbar} ${className} navbar`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${style.navBackground} ${bgClass}`}></div>
        <div className={`${style.navItems} navBar`}>
          <Link to="/" className={`${style.logo}`}>
            <img src={NormalLogo} className={`${style.normalLogo}`} />
            <img src={WhiteLogo} className={`${style.whiteLogo}`} />
          </Link>
          <div className={style.activeNavBackground}></div>

          <ul className={`${style.navMenu}`}>
            {links.map(({ path, title, dropDown }) => {
              if (dropDown)
                return (
                  <li className={`${style.navItem}`}>
                    {isMobile ? (
                      <div className={style.mobileList}>
                        <Link to={path} className={style.navLink}>
                          {title}
                        </Link>
                        <ul className={style.mobileSublist}>
                          {dropDown.map(({ title, path }) => {
                            return (
                              <li>
                                <Link to={path}>{title}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <Dropdown
                        // id={1}
                        link={
                          <Link
                            to="/"
                            className={`${style.navLink}`}
                            onClick={(e) => e.preventDefault()}
                          >
                            {title}
                          </Link>
                        }
                      >
                        {dropDown.map(({ title, path }) => {
                          return (
                            <li>
                              <Link to={path}>{title}</Link>
                            </li>
                          );
                        })}
                      </Dropdown>
                    )}
                  </li>
                );
              else
                return (
                  <li className={style.navItem}>
                    <Link
                      to={path}
                      // activeClassName="active"
                      className={style.navLink}
                      onClick={click ? handleClick : null}
                    >
                      <span>{title}</span>
                    </Link>
                  </li>
                );
            })}

            <li className={style.navItem}>
              <Link to="/" className={`${style.navLink} ${style.langButton}`}>
                EN
              </Link>
            </li>
            <li className={style.navItem}>
              <LinkBtn
                id="contactButton"
                Icon={ContactIcon}
                label=" "
                className={`${style.contactButton}`}
                to="/contact"
              >
                Contact Us
                <ContactIcon />
              </LinkBtn>
            </li>
          </ul>
          {isMobile && (
            <div className={style.contactBtnWrapper}>
              <Link to="/contact">
                <ContactIcon className={style.mobileContactIcon} />
              </Link>
              <div className={`${style.navIcon}`} onClick={handleClick}>
                <MenuCircle className={style.menuCircle} />
                <MenuIcon className={style.menuIcon} ref={MobileMenuIconRef} />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

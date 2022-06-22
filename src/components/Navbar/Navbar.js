import { useEffect, useState, useRef, useCallback, useContext } from "react";
import NormalLogo from "./LogoDigination.png";
import WhiteLogo from "./whiteLogo.png";
import style from "./Navbar.module.scss";
import { ReactComponent as ContactIcon } from "../talkIcon.svg";
import { ReactComponent as MenuIcon } from "../../SVG/menu.svg";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../Button/Button";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import "./customizations.scss";
import { MyContext } from "../../App";

gsap.registerPlugin(CustomEase);

gsap.registerPlugin(ScrollTrigger);
const links = [
  { path: "/", title: "Home" },
  {
    path: "/about",
    title: "About Us",
  },
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
      { title: "AI Solutions", path: "/services" },
      { title: "Infrastructure & Operations", path: "/services" },
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
  {
    path: "/parteners",
    title: "Parteners",
  },
  {
    path: "/clients",
    title: "Clients",
  },
  {
    path: "/careers",
    title: "Careers",
  },
];

function NavBar() {
  const [click, setClick] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const navRef = useRef();
  const isMobile = width <= 999;
  const location = useLocation();
  const overlayTween = useRef(null);
  const mobileNavRef = useRef(null);
  const highlightTween = useRef(null);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    highlightTween.current = gsap
      .timeline({ pause: true })
      .fromTo(
        `.${style.navBackground}`,
        {
          background: "#1D2B28",
          boxShadow: "none",
          color: "white",
        },
        {
          background: "white",
          // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.034)",
          ease: "none",
          duration: 0.2,
          immediateRender: false,
        }
      )
      .set(`.${style.normalLogo}`, {
        visibility: "visible",
      })
      .set(`.${style.whiteLogo}`, {
        visibility: "hidden",
      });
    overlayTween.current = gsap
      .timeline()
      .set(".overlay", {
        display: "block",
      })
      .fromTo(".overlay", { opacity: 0, duration: 0.6 }, { opacity: 0.2 });

    mobileNavRef.current = gsap
      .timeline({ paused: true })
      .fromTo(
        `.${style.activeNavBackground}`,
        { autoAlpha: 0, duration: 1 },
        { autoAlpha: 1 }
      )
      .fromTo(
        `.${style.activeNavBackground}`,
        {
          scaleY: 0,
        },
        {
          duration: 0.2,
          scaleY: 1,
          transformOrigin: "50% 0%",
          ease: "circ.out",
        }
      )
      .fromTo(
        `.${style.navMenu}`,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.2,
        }
      );

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    if (click) {
      mobileNavRef.current.play();
    }
    if (!click && isMobile) {
      mobileNavRef.current.reverse();
    }
    if (!click && !isMobile) {
      gsap.set(`.${style.navMenu}`, {
        autoAlpha: 1,
      });
    }
  }, [click, isMobile, location.pathname]);

  useEffect(() => {
    if (activeDropdown) overlayTween.current.play();
    else overlayTween.current.reverse();
  }, [activeDropdown]);

  return (
    <div style={{ zIndex: 20 }}>
      <nav
        onMouseOver={() => {
          // highlightTween.current.play();
        }}
        onMouseLeave={() => {
          // highlightTween.current.reverse();
        }}
        ref={navRef}
        className={`${style.navbar}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${style.navBackground}`}></div>
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
                  <li
                    onMouseOver={() => {
                      setActiveDropdown(true);
                    }}
                    onMouseLeave={() => {
                      setActiveDropdown(false);
                    }}
                    className={`${style.navItem}`}
                  >
                    <Dropdown
                      id={1}
                      link={
                        <Link
                          to="/"
                          className={`${style.industry}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          Solutions <CaretDownOutlined />
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
                  </li>
                );
              else
                return (
                  <li className={style.navItem}>
                    <Link
                      to={path}
                      // activeClassName="active"
                      // className={"nav-links"}
                      onClick={click ? handleClick : null}
                    >
                      <span>{title}</span>
                    </Link>
                  </li>
                );
            })}

            <li className={style.navItem}>
              <Link
                to="/"
                className={`${style.rightBorder} ${style.langButton}`}
              >
                EN
              </Link>
            </li>
          </ul>
          <div className={style.rightMost}>
            <Button
              id="contactButton"
              Icon={ContactIcon}
              label="Contact Us "
              className={`${style.contactButton} ${style.blue}`}
            />

            <div className={`${style.navIcon}`} onClick={handleClick}>
              <MenuIcon />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

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

function NavBar() {
  const [click, setClick] = useState(false);
  const [isNavHighlited, setIsNavHighlited] = useState(false);
  const { scrollRef, isAppMounted } = useContext(MyContext);
  const [isScrolled, setIsScrolled] = useState();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDropdownOn = useRef(false);
  const navRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const [dropDown, setDropdown] = useState(isDropdownOn.current);
  const isMobile = width <= 999;
  let overlay;
  const location = useLocation();
  const unHighlightTl = useRef(null);
  const highlightTl = useRef(null);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    highlightTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        `.${style.navbar}`,
        {
          duration: 0,
          color: "white",
          borderBottom: "none",
        },
        {
          duration: 0,
          color: "#333",
          borderBottom: "1px solid #d4e0e6",
        }
      )
      .fromTo(
        `.${style.navItems}`,
        {
          backgroundColor: "transparent",
        },
        {
          // scale: 1.12,
          backgroundColor: "white",
          duration: 0.2,
          // ease: "power3.out",
        }
      )
      .fromTo(
        "#contactButton",
        { backgroundColor: "transparent", ease: "power3.out", duration: 0.4 },
        {
          backgroundColor: "#00b295",
          ease: "power3.out",
          duration: 0.2,
        },
        "<"
      )
      .fromTo(
        `.${style.whiteLogo}`,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.2,
        },
        "<"
      )
      .fromTo(
        `.${style.normalLogo}`,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.2,
        },
        "<"
      );

    unHighlightTl.current = gsap
      .timeline({ paused: true })
      .to(`.${style.navItems}`, {
        color: "white",
        duration: 0.1,
      })
      .to(
        `.${style.navItems}`,
        {
          backgroundColor: "transparent",
          duration: 0.3,
          paused: false,
          ease: "power3.in",
          borderBottom: "none",
          // ease: "power3.out",
        }
        // "<"
      )

      .to(
        "#contactButton",
        {
          backgroundColor: "transparent",
          ease: "power3.out",
          duration: 0.4,
        },
        "<"
      )
      .to(
        `.${style.whiteLogo}`,
        {
          autoAlpha: 1,
          duration: 0.2,
        },
        "<"
      )
      .to(
        `.${style.normalLogo}`,
        {
          autoAlpha: 0,
          duration: 0.2,
        },
        "<"
      );
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const handleClick = () => {
    setClick(!click);
  };
  function highlightNav() {
    highlightTl.current.play();
  }
  function unHighlightNav() {
    highlightTl.current.progress(1).reverse();
  }

  useEffect(() => {
    setIsScrolled(false);
  }, [location.pathname]);
  useEffect(() => {
    if (isScrolled || click || activeDropdown || isHovered)
      setIsNavHighlited(true);
    if (!isScrolled && !click && !activeDropdown && !isHovered)
      setIsNavHighlited(false);
  }, [isHovered, activeDropdown, isScrolled, click, location.pathname]);
  useEffect(() => {
    if (isNavHighlited) highlightNav();
    if (!isNavHighlited) unHighlightNav();
  }, [isNavHighlited, location.pathname]);

  useEffect(() => {
    if (click) {
      setIsNavHighlited(true);
      gsap.to(".nav-menu", {
        duration: 0.5,
        scaleY: 1,
        rotation: 0.01,
        transformOrigin: "50% 0%",
        ease: CustomEase.create("custom", "M0,0 C1,-0.088 0.492,1 1,1 "),
      });
    }
    if (!click && isMobile) {
      gsap.set(".nav-menu", {
        scaleY: 0,
      });
    }
    if (!click && !isMobile) {
      gsap.to(".nav-menu", {
        duration: 0.5,
        scaleY: 1,
        rotation: 0.01,
        transformOrigin: "50% 0%",
        ease: CustomEase.create("custom", "M0,0 C1,-0.088 0.492,1 1,1 "),
      });
    }
  }, [click, isMobile, location.pathname]);

  const scroll = useRef(null);
  useEffect(() => {
    if (!isAppMounted) return;
    setTimeout(() => {
      scroll.current = ScrollTrigger.create({
        // trigger: ".App",
        trigger: "[data-scroll-container]",
        start: () => "200px top",
        endTrigger: ".App",
        end: () => "bottom top",
        onEnter: () => {
          setIsScrolled(true);
        },
        onEnterBack: () => {
          setIsScrolled(true);
        },
        onLeave: () => {
          setIsScrolled(false);
        },
        onLeaveBack: () => {
          setIsScrolled(false);
        },
      });
    }, 10);

    return () => {
      if (scroll.current) scroll.current.kill();
    };
  }, [location.pathname, isAppMounted]);
  useEffect(() => {
    if (activeDropdown)
      gsap
        .timeline()
        .set(".overlay", {
          display: "block",
        })
        .to(".overlay", { opacity: 0.2 });
    else
      gsap
        .timeline()
        .set(".overlay", {
          display: "none",
        })
        .to(".overlay", { opacity: 0, duration: 0.6 });
  }, [activeDropdown]);
  function handleDropdownClose(id) {
    if (isDropdownOn.current === id) setActiveDropdown(false);
  }
  return (
    <div style={{ zIndex: 20 }}>
      <nav
        ref={navRef}
        className={`${style.navbar}`}
        onClick={(e) => e.stopPropagation()}
        // data-scroll-sticky
        // data-scroll-target="[data-scroll-container]"
        // data-scroll
      >
        <div
          className={`${style.navItems} navBar`}
          // onMouseEnter={isScrolled || click ? undefined : handleMouseEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            // isScrolled || click || activeDropdown ? undefined : handleMouseLeave
            setIsHovered(false);
          }}
        >
          <Link to="/" className={`${style.logo}`}>
            <img src={NormalLogo} className={`${style.normalLogo}`} />
            <img src={WhiteLogo} className={`${style.whiteLogo}`} />
            {/* {isNavHighlited ? (
            ) : (
            )} */}
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className={style.navItem}>
              <Link
                to="/"
                // activeClassName="active"
                // className={"nav-links"}
                onClick={click ? handleClick : null}
              >
                <span>Home</span>
              </Link>
            </li>
            <li className={style.navItem}>
              <Link
                to="/about"
                // activeClassName="active"
                // className="nav-links"
                onClick={click ? handleClick : null}
              >
                About us
              </Link>
            </li>
            <li className={style.navItem}>
              <Link
                to="/services"
                // activeClassName="active"
                // className="nav-links"
                onClick={click ? handleClick : null}
              >
                Services
              </Link>
            </li>
            <li className={`${style.navItem}`}>
              <Dropdown
                id={1}
                isOpen={isDropdownOn.current === 1}
                onOpen={() => {
                  setActiveDropdown(true);
                  isDropdownOn.current = 1;
                }}
                onClose={handleDropdownClose}
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
                <li>
                  <Link to="/services">Business Application</Link>
                </li>
                <li>
                  <Link to="/services">Business Intelligence</Link>
                </li>
                <li>
                  <Link to="/services">AI Solutions</Link>
                </li>
                <li>
                  <Link to="/services">Infrastructure & Operations</Link>
                </li>
              </Dropdown>
            </li>
            <li className={style.navItem}>
              <Dropdown
                id={2}
                isOpen={isDropdownOn.current === 2}
                onOpen={() => {
                  setActiveDropdown(true);
                  isDropdownOn.current = 2;
                }}
                onClose={handleDropdownClose}
                link={
                  <Link
                    to="/"
                    className={`${style.industry}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    Industries <CaretDownOutlined />
                  </Link>
                }
              >
                <li>
                  <Link to="/services">Financial sector</Link>{" "}
                </li>
                <li>
                  <Link to="/">Healthcare</Link>
                </li>
                <li>
                  <Link to="/">Insurance</Link>
                </li>
                <li>
                  <Link to="/">Education</Link>
                </li>
                <li>
                  <Link to="/">Oil and gas</Link>
                </li>
                <li>
                  <Link to="/">Communication</Link>
                </li>
                <li>
                  <Link to="/">Government</Link>
                </li>
              </Dropdown>
            </li>
            <li className={style.navItem}>
              <Dropdown
                id={3}
                isOpen={isDropdownOn.current === 3}
                onOpen={() => {
                  setActiveDropdown(true);
                  isDropdownOn.current = 3;
                }}
                onClose={handleDropdownClose}
                link={
                  <Link
                    to="/"
                    className={`${style.industry}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    Parteners <CaretDownOutlined />
                  </Link>
                }
              ></Dropdown>
            </li>
            <li className={style.navItem}>
              <Link
                to="/"
                className={`${style.industry}`}
                onClick={(e) => e.preventDefault()}
              >
                Clients
              </Link>
            </li>
            <li className={style.navItem}>
              <Link
                to="/contact"
                // activeClassName="active"
                // className={style.navItem}
                onClick={click ? handleClick : null}
              >
                Careers
              </Link>
            </li>
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
              // style={{
              //   backgroundColor: isNavHighlited ? "#00b295" : "transparent",
              //   color: isNavHighlited ? "white" : "inherit",
              // }}
              className={`${style.contactButton} ${style.blue}`}
            />

            <div className="nav-icon" onClick={handleClick}>
              <MenuIcon />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

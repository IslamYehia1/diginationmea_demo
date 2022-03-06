import { useEffect, useState, useRef, useCallback } from "react";
import NormalLogo from "./LogoDigination.png";
import WhiteLogo from "./whiteLogo.png";
import style from "./Navbar.module.scss";
import { ReactComponent as ContactIcon } from "../talkIcon.svg";
import { ReactComponent as MenuIcon } from "../../SVG/menu.svg";
import { Menu, Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../Button/Button";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import DropdownMenu from "../Dropdown/Dropdown";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./customizations.scss";
gsap.registerPlugin(CustomEase);

gsap.registerPlugin(ScrollTrigger);
function MenuOverlay() {
  return (
    <Menu className={`${style.modifiedMenu}`}>
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Banking
        </a>
      </Menu.Item>
      {/* <Menu.Item icon={<DownOutlined />} disabled> */}
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Healthcare
        </a>
      </Menu.Item>
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Fine tech
        </a>
      </Menu.Item>
      <Menu.Item className={style.modifiedListItem}>
        <a
          className={style.modified}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item>
    </Menu>
  );
}

function NavBar({ isScrolled }) {
  const [click, setClick] = useState(false);
  const [isNavHighlited, setIsNavHighlited] = useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const overlayStyle = {
    width: "100%",
    overflow: "auto",
  };
  const navRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 999;
  // function highlightNav() {
  //   gsap.to(".navBar", {
  //     // scale: 1.12,
  //     backgroundColor: "white",
  //     borderBottom: "1px solid #d4e0e6",
  //     color: "#333",
  //     duration: 0.3,
  //     paused: false,
  //     ease: "power3.out",
  //   });
  // }
  // function unHighlightNav() {
  //   gsap.to(".navBar", {
  //     backgroundColor: "transparent",
  //     borderBottom: "none",
  //     color: "white",
  //     duration: 0.3,
  //     paused: false,
  //     ease: "power3.out",
  //   });
  // }
  // const handleMouseEnter = useCallback(() => {
  //   setIsNavHighlited(true);
  // });
  // const handleMouseLeave = useCallback(() => {
  //   if (!isScrolled && !click) setIsNavHighlited(false);
  // });
  // useEffect(() => {
  //   if (isNavHighlited) highlightNav();
  //   if (!isNavHighlited) unHighlightNav();
  // }, [isNavHighlited]);
  // useEffect(() => {
  //   if (isScrolled || click) setIsNavHighlited(true);
  //   if (!isScrolled && !click) setIsNavHighlited(false);
  // }, [isScrolled, click]);
  function toggleOverlay() {
    let overlay = document.querySelector(".overlay");
    let overlayState = overlay.style.display;
    if (overlay)
      overlay.style.display = overlayState === "block" ? "none" : "block";
  }
  useEffect(() => {
    console.log(isMobile);
    if (click) {
      // setIsNavHighlited(true);
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
  }, [click, isMobile]);

  return (
    <div style={{ zIndex: 20 }}>
      <nav
        ref={navRef}
        className={`navBar ${style.navbar}`}
        onClick={(e) => e.stopPropagation()}
        data-scroll-sticky
        data-scroll-target=".App"
        data-scroll
        // onMouseLeave={isScrolled || click ? undefined : handleMouseLeave}
        // onMouseEnter={isScrolled || click ? undefined : handleMouseEnter}
      >
        <div className={style.navItems}>
          <Link to="/">
            <img src={NormalLogo} className={`${style.logo} whiteLogo`} />
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className={style.navItem}>
              <Link
                to="/"
                // activeClassName="active"
                // className={"nav-links"}
                onClick={click ? handleClick : null}
              >
                Home
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
                to="/blog"
                // activeClassName="active"
                // className="nav-links"
                onClick={click ? handleClick : null}
              >
                Services
              </Link>
            </li>
            <li className={`${style.navItem}`}>
              <Dropdown
                onVisibleChange={() => {
                  toggleOverlay();
                }}
                overlayStyle={overlayStyle}
                overlay={MenuOverlay}
              >
                <Link
                  to="/"
                  className={`${style.industry}`}
                  onClick={(e) => e.preventDefault()}
                >
                  Solutions <CaretDownOutlined />
                </Link>
              </Dropdown>
            </li>
            <li className={style.navItem}>
              <Dropdown
                onVisibleChange={() => {
                  toggleOverlay();
                }}
                overlayStyle={overlayStyle}
                overlay={MenuOverlay}
              >
                <Link
                  to="/"
                  className={`${style.industry}`}
                  onClick={(e) => e.preventDefault()}
                >
                  Industries <CaretDownOutlined />
                </Link>
              </Dropdown>
            </li>
            <li className={style.navItem}>
              <Dropdown
                onVisibleChange={() => {
                  toggleOverlay();
                }}
                overlayStyle={overlayStyle}
                overlay={MenuOverlay}
              >
                <Link
                  to="/"
                  className={`${style.industry}`}
                  onClick={(e) => e.preventDefault()}
                >
                  Parteners <CaretDownOutlined />
                </Link>
              </Dropdown>
            </li>
            <li className={style.navItem}>
              <Dropdown
                onVisibleChange={() => {
                  toggleOverlay();
                }}
                overlayStyle={overlayStyle}
                overlay={MenuOverlay}
              >
                <Link
                  to="/"
                  className={`${style.industry}`}
                  onClick={(e) => e.preventDefault()}
                >
                  Clients <CaretDownOutlined />
                </Link>
              </Dropdown>
            </li>
            <li className={style.navItem}>
              <Link
                to="/contact"
                // activeClassName="active"
                // className={style.navItem}
                onClick={click ? handleClick : null}
              >
                Contact Us
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
            {/* 
            <li className={style.navItem}>
              <Button
                id="contactButton"
                Icon={ContactIcon}
                label="Contact Us "
                style={{
                  backgroundColor: isNavHighlited ? "" : "#11ffee00",
                }}
                className={`${isNavHighlited ? "" : style.emptyButton} ${
                  style.contactButton
                } ${style.blue}`}
              />
            </li> */}
          </ul>
          <div className="rightMost">
            <Button
              id="contactButton"
              Icon={ContactIcon}
              label="Contact Us "
              style={{
                backgroundColor: isNavHighlited ? "" : "#11ffee00",
              }}
              className={` ${style.contactButton} ${style.blue}`}
            />

            <div className="nav-icon" onClick={handleClick}>
              {/* <i className={click ? "fa fa-times" : "fa fa-bars"}></i> */}
              <MenuIcon />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );
}
export default NavBar;

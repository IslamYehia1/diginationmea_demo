import { useEffect, useState, useRef, useCallback, useContext } from "react";
import desktopNavStyle from "./Navbar.module.scss";
import commonNavStyle from "./commonNavbar.module.scss";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

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
    path: "/partners",
    title: "Partners",
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
    title: "industries",
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

function NavBar({ isScrolled, bgClass, className, highlightOnMobile }) {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 999;
  const highlightTween = useRef(null);
  const timeOut = useRef(null);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    highlightTween.current = gsap
      .timeline({ paused: true })
      .to(`.${commonNavStyle.navBackground}`, {
        immediateRender: false,
        background: "hsla(100, 100%, 99% , 0.904)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.034)",
        ease: "none",
        duration: 0.2,
      })
      .set(`.${commonNavStyle.navbar}`, {
        color: "#1D2B28",
      })
      .set(`.${commonNavStyle.whiteLogo}`, {
        visibility: "hidden",
      })
      .set(`.${commonNavStyle.coloredLogo}`, {
        visibility: "visible",
        // filter: "initial",
      });
    highlightTween.current.set(`:root`, {
      // backgroundColor: "#66B186",
      "--contactBtnBg": "#1D2B28",
      "--contactBtnColor": "#9ABEA3",
    });

    if (!isMobile) {
    } else {
    }
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
      highlightTween.current.seek(0).kill();
    };
  }, [isMobile]);

  useEffect(() => {
    if (isScrolled) highlightTween.current.restart();
    else highlightTween.current.reverse();
  }, [isScrolled, isMobile]);
  const highlight = useCallback(() => {
    highlightTween.current.play();
    clearTimeout(timeOut.current);
  });
  const unHighlight = useCallback(() => {
    if (!isScrolled) {
      clearTimeout(timeOut.current);
      timeOut.current = setTimeout(() => {
        highlightTween.current.reverse();
      }, 700);
    }
  });
  return (
    <nav
      className={`${commonNavStyle.navbar} navbar ${className || ""}`}
      style={{ zIndex: 20 }}
    >
      {isMobile ? (
        <MobileNavbar
          bgClass={bgClass}
          linksList={links}
          isScrolled={isScrolled}
          links={links}
          onHighlight={highlightOnMobile ? highlight : null}
          onUnHighlight={highlightOnMobile ? unHighlight : null}
        />
      ) : (
        <DesktopNavbar
          onMouseOver={() => {
            highlight();
          }}
          onMouseLeave={() => {
            if (!isScrolled) {
              unHighlight();
            }
          }}
          isScrolled={isScrolled}
          bgClass={bgClass}
          // className={className}
          links={links}
        />
      )}
    </nav>
  );
}

export default NavBar;

import { useEffect, useState, useRef, useCallback, useContext } from "react";
import NormalLogo from "./LogoDigination.png";
import WhiteLogo from "./whiteLogo2.png";
import style from "./Navbar.module.scss";
import commonNavStyle from "./commonNavbar.module.scss";
import { ReactComponent as ContactIcon } from "../../SVG/send.svg";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import LinkBtn from "../Button/LinkBtn";

gsap.registerPlugin(ScrollTrigger);

function DesktopNavbar({ links, onMouseOver, onMouseLeave, bgClass }) {
  return (
    <div
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      // className={`${style.navbar} `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`${commonNavStyle.navBackground} ${bgClass}`}></div>
      <div className={`${style.navItems} navBar`}>
        <Link to="/" className={`${style.logo}`} aria-label="Homepage link">
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

        <ul className={`${style.navMenu}`}>
          {links.map(({ path, title, dropDown }, index) => {
            if (dropDown)
              return (
                <li key={index} className={`${style.navItem}`}>
                  {
                    <Dropdown
                      // id={1}
                      link={
                        <Link
                          to="/"
                          className={`${style.navLink}`}
                          onClick={(e) => e.preventDefault()}
                          aria-label={`${title} page link`}
                        >
                          {title}
                        </Link>
                      }
                    >
                      {dropDown.map(({ title, path }, index) => {
                        return (
                          <li key={index}>
                            <Link to={path} aria-label={`${title} page link`}>
                              {title}
                            </Link>
                          </li>
                        );
                      })}
                    </Dropdown>
                  }
                </li>
              );
            else
              return (
                <li key={index} className={style.navItem}>
                  <Link
                    to={path}
                    aria-label={`${title} page`}
                    className={style.navLink}
                    // onClick={click ? handleClick : null}
                  >
                    <span>{title}</span>
                  </Link>
                </li>
              );
          })}
          {/* 
          <li className={style.navItem}>
            <Link
              aria-label="Change language"
              to="/"
              className={`${style.navLink} ${style.langButton}`}
            >
              EN
            </Link>
          </li> */}
          <li className={style.navItem}>
            <LinkBtn
              id="contactButton"
              Icon={ContactIcon}
              ariaLabel="Go to contact us page"
              className={`${style.contactButton}`}
              to="/contact"
            >
              <span>Contact Us</span>
              <ContactIcon />
            </LinkBtn>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default DesktopNavbar;

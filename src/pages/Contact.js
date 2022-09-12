import NavBar from "../components/Navbar/Navbar";
import ContactForm from "../components/ContactForm/ContactForm";
import { useLocoscroll } from "../components/Common/useLocoscroll";
import Footer from "../components/ContactForm/ContactFooter";
import { useRef } from "react";
import style from "./Contact.module.scss";
import "../global.scss";

import { useEffect } from "react";
function Contact({ onMount }) {
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 1);
  useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  return (
    <>
      <NavBar
        className={style.navBar}
        isScrolled={true}
        normalLogoOnly={true}
        bgClass={style.navBarBg}
      />
      <div ref={scrollRef}>
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}
export default Contact;

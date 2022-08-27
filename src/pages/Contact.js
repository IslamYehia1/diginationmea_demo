import NavBar from "../components/Navbar/Navbar";
import ContactForm from "../components/ContactForm/ContactForm";
import LocationInfo from "../components/ContactForm/LocationInfo";
import { useLocoscroll } from "../components/Common/useLocoscroll";
import Footer from "../components/ContactForm/ContactFooter";
import { useRef } from "react";
import style from "./Contact.module.scss";
import "../global.scss";
function Contact() {
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 1);
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
        <LocationInfo />
        <Footer />
      </div>
    </>
  );
}
export default Contact;

import Footer from "rc-footer";
import "rc-footer/assets/index.css";
// import Logo from "./LogoDigination.png";
import style from "./Footer.module.scss";
import Logo from "../Images/logo.png";
import LinkBtn from "../Button/LinkBtn";
import { ReactComponent as Facebook } from "../../SVG/facebook-logo_1.svg";
import { ReactComponent as Instagram } from "../../SVG/instagram_1.svg";
import { ReactComponent as LinkedIn } from "../../SVG/linkedin.svg";
function PageFooter() {
  return (
    <footer className={style.footer}>
      <div className={style.firstRow}>
        <div className={style.connectInfo}>
          <h1>Let's connect</h1>
          <div className={style.row}>
            <div className={style.address}>
              <h2>Address</h2>
              <p>214, Olaya street, Olaya, 8460, Riyadh, Saudi Arabia 14233.</p>
            </div>
            <div className={style.general}>
              <h2>General</h2>
              <p>+966112399809</p>
              <p>info@diginationmea.com</p>
            </div>
          </div>
        </div>
        <form className={style.contactForm}>
          <h2>Contact Us</h2>
          {/* <img src={Logo} className={style.logo} /> */}
          <div className={style.inputFields}>
            {/* <input type="text" placeholder="Your name" /> */}
            <input type="text" placeholder="Your email" />
            <textarea rows="6" placeholder="Your message" />
            <LinkBtn className={style.submitBtn} to="/contact">
              <span>Submit</span>
            </LinkBtn>
          </div>
        </form>
      </div>
      <div className={style.secondRow}>
        <Facebook />
        <Instagram />
        <LinkedIn />
      </div>
      <div className={style.thirdRow}>Made by: Islam Mansour</div>
    </footer>
  );
}

export default PageFooter;

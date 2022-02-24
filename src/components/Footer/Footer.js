import Footer from "rc-footer";
import "rc-footer/assets/index.css";
import Logo from "./LogoDigination.png";
import style from "./Footer.module.scss";
function PageFooter() {
  return (
    <div className={style.footer}>
      <div className={style.firstColumn}>
        <h3 className={style.columnHeading}></h3>
      </div>
      <div className={style.secondColumn}>
        <h3 className={style.columnHeading}></h3>
      </div>
      <div className={style.thirdColumn}>
        <h3 className={style.columnHeading}></h3>
      </div>
    </div>
  );
}

export default PageFooter;

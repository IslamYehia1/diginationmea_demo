import NavBar from "../components/Navbar/Navbar";
import style from "./Partners.module.scss";
import RotatingSlider from "../components/RotatingSlider/RotatingSlider";

function Partners({ onMount }) {
  return (
    <>
      <NavBar
        highlightOnMobile={true}
        isScrolled={false}
        bgClass={style.navBg}
        className={style.navBar}
      />
      <RotatingSlider
        onLoad={() => {
          onMount();
        }}
      />
    </>
  );
}

export default Partners;

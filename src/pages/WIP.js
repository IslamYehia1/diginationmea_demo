import { useEffect } from "react";
import { Nav } from "rsuite";
import style from "./WIP.module.scss";
import NavBar from "../components/Navbar/Navbar";
import TypewriterEffect from "../components/TypewriterEffect/TypewriterEffect";
function WIP({ onLoad }) {
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <>
      <NavBar isScrolled={true} />
      <div className={style.wrapper}>
        <TypewriterEffect
          className={style.typeWriter}
          textList={["Work in progress...", "This is just a demo site"]}
        />
      </div>
    </>
  );
}
export default WIP;

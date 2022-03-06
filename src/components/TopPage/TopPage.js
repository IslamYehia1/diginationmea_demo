import style from "./TopPage.module.scss";
import Button from "../Button/Button";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import ArrowButton from "../ArrowButton/ArrowButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useContext } from "react";
import { MyContext } from "../../App";

function TopPage() {
  const scrollRef = useContext(MyContext);
  useEffect(() => {
    if (!scrollRef) return;
    ScrollTrigger.create({
      trigger: `.firstPage`,
      start: "top top",
      end: "bottom+=60% bottom",
      pin: true,
      pinSpacing: false,
      scroller: scrollRef,
      // scroller: scrollRef,
    });
  }, [scrollRef]);
  return (
    <div className={`${style.firstPage} firstPage`}>
      <div className={style.landingHeading}>
        <h3>Your Partner for Digital Transformation</h3>
        <h1>
          DigiNation is a leading digital business automation company in KSA
          that offered successful business solutions to over 800 clients across
          the region.
        </h1>
        <ArrowButton
          Icon={ArrowRightOutlined}
          label="Contact Us "
          style={
            {
              // backgroundColor: "#11ffee00",
            }
          }
          className={`${style.button}`}
        />
      </div>
    </div>
  );
}

export default TopPage;

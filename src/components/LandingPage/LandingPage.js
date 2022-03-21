import style from "./LandingPage.module.scss";
import Button from "../Button/Button";
import { ArrowRightOutlined } from "@ant-design/icons";
import ArrowButton from "../ArrowButton/ArrowButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/all";
import { useEffect, useContext } from "react";
import { MyContext } from "../../App";
import { ReactComponent as Circles } from "../../SVG/circles.svg";
gsap.registerPlugin(TextPlugin);

function LandingPage() {
  const scrollRef = useContext(MyContext);
  var i = 0;
  const messageBodyStr = [
    "Extensive experience of Low code",
    "Business Intelligence",
    "Business Processes",
    "Enterprise Content Management",
    "Analytics",
  ];

  const mainTimeline = gsap.timeline({ repeat: -1 });
  // mainTimeline.timeScale(2);
  useEffect(() => {
    // ScrollTrigger.create({
    //   trigger: `.firstPage`,
    //   start: "top top",
    //   end: "bottom+=60% bottom",
    //   pin: true,
    //   pinSpacing: false,
    //   scroller: scrollRef,
    //   // scroller: scrollRef,

    const speed = 10;
    const endFlashSpeed = 0.3;
    const character = "|";
    messageBodyStr.forEach((label, index) => {
      let typingTl = gsap.timeline({ repeat: 1, yoyo: true });
      typingTl
        .fromTo(
          "#myText",
          {
            text: "",
          },
          {
            duration: label.length / speed,
            text: label,
            ease: "Linear.easeNone",
            onUpdate: function () {
              // console.log(this._targets[0].textContent);
              this._targets[0].textContent += character;
            },
            onComplete: function () {
              // this.target[0].textContent = messageBodyStr;
              this._targets[0].textContent = label;
            },
          },
          "+=0.5"
        )
        // .to("#myText", {
        //   width: "100%",
        // })
        //makes it flash at the end
        .to("#myText", {
          duration: endFlashSpeed,
          text: label + character,
          repeat: 3,
          repeatDelay: endFlashSpeed,
          ease: "Linear.easeOut",
          duration: 1,
        });
      mainTimeline.add(typingTl, ">");
    });

    // });
  }, []);
  return (
    <div className={`${style.landingPage} firstPage`}>
      <div className={style.topGradient}>
        {/* <canvas></canvas> */}
        <Circles />
      </div>
      <div className={style.landingHeading}>
        <h1>Your partner for digital transformation</h1>
        {/* <h1>Digital transformation</h1> */}
        <div className={`${style.titleRow} ${style.labels}`}>
          <h1 className={style.changingTextLabel}>With our</h1>
          {/* <svg viewBox="0 0 495 10" xmlns="http://www.w3.org/2000/svg">
            <defs></defs> */}
          <div className={style.changingTextWrapper}>
            <h1
              // height="100%"
              // fill="#000"
              // x="50%"
              // y="50%"
              // dominant-baseline="middle"
              // text-anchor="start"
              id="myText"
              className={style.changingText}
            ></h1>
          </div>

          {/* </svg> */}
          {/* <Labels /> */}
        </div>
        <p className={style.description}>
          We are a regional technology enterprise specialized in providing
          Digital Transformation
        </p>
        <p className={style.description}>
          and complex technology solutions to a wide array of industries and
          businesses.
        </p>

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

export default LandingPage;

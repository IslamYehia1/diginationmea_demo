import { useContext, useEffect } from "react";
import gsap from "gsap";
import style from "./Services.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MyContext } from "../../App";
import ItImg from "../Images/cables.jpg";
import ServicesContainer from "./ServicesContainer";
import { ReactComponent as SolutionsIcon } from "../../SVG/solution.svg";
import { ReactComponent as ServicesIcon } from "../../SVG/cloud-computing.svg";
import ItServices from "../Images/ItServices.jpg";

import SolutionsIcon2 from "../../SVG/computing.png";
import SectionSeperator from "../Solutions/SectionSeperator";

gsap.registerPlugin(ScrollTrigger);
function Services({ isHomeMounted }) {
  const scrollRef = useContext(MyContext);
  // useEffect(() => {
  //   if (!scrollRef) return;

  //   const content = gsap.utils.toArray(".content");

  //   content.forEach((content) => {
  //     let q = gsap.utils.selector(content);
  //     // let ani = gsap.to(q("img"), {
  //     //   opacity: 1,
  //     //   duration: 0.5,
  //     // });
  //     let t1 = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: content,
  //         start: "top center",
  //         end: "bottom center",
  //         toggleActions: "play reverse play reverse",
  //         scroller: scrollRef,
  //         preventOverlaps: true,
  //         fastScrollEnd: true,
  //         toggleClass: "gradientText",
  //         // toggleClass: `${style.gradientText}`,
  //         // onEnter: () => {
  //         //   t1.to(content, {
  //         //     height: "10rem",
  //         //   });
  //         //   t1.to(
  //         //     q("p"),
  //         //     {
  //         //       opacity: 1,
  //         //     },
  //         //     "<"
  //         //   );
  //         // },
  //         // onEnterBack: () => {
  //         //   t1.to(content, {
  //         //     height: "10rem",
  //         //   });
  //         //   t1.to(
  //         //     q("p"),
  //         //     {
  //         //       opacity: 1,
  //         //     },
  //         //     "<"
  //         //   );
  //         // },
  //         // onLeave: () => {
  //         //   t1.set(content, {
  //         //     height: "5rem",
  //         //   });
  //         //   t1.set(q("p"), {
  //         //     opacity: 0,
  //         //   });
  //         //   // gsap.to(q("img"), {
  //         //   //   opacity: 0,
  //         //   //   duration: 0.2,
  //         //   // });
  //         // },
  //         // onLeaveBack: () => {
  //         //   t1.set(q("p"), {
  //         //     opacity: 0,
  //         //   });
  //         //   t1.set(content, {
  //         //     height: "5rem",
  //         //   });
  //         //   // gsap.to(q("img"), {
  //         //   //   opacity: 0,
  //         //   //   duration: 0.2,
  //         //   // });
  //         // },
  //       },
  //     });
  //     t1.fromTo(
  //       content,
  //       {
  //         height: "20rem",
  //       },
  //       { height: "30rem" }
  //     );
  //     t1.to(
  //       q("p"),
  //       {
  //         opacity: 1,
  //       },
  //       "<"
  //     );
  //     t1.add(() => {
  //       content.classList.add("gradientText");
  //     });
  //     // t1.fromTo(
  //     //   q("img"),
  //     //   {
  //     //     opacity: 0,
  //     //     // duration: 0.5,
  //     //   },
  //     //   { opacity: 1, duration: 0.5 }
  //     // );
  //     // t1.to(content, {
  //     //   height: "10rem",
  //     // });
  //     // t1.fromTo(
  //     //   q("p"),
  //     //   {
  //     //     opacity: 0,
  //     //     // duration: 0.5,
  //     //   },
  //     //   { opacity: 1 },
  //     //   "<"
  //     // );
  //   });
  //   ScrollTrigger.create({
  //     trigger: `${style.servicesTitle}`,
  //     start: "top 5%",
  //     end: "bottom top",
  //     pin: `.activeLine`,
  //     scroller: scrollRef,
  //   });
  // }, [scrollRef]);
  return (
    <div className={`${style.services} services`}>
      <SectionSeperator
        SectionImg={ItServices}
        Icon={ServicesIcon}
        imgScrollTarget={style.services}
        isHomeMounted={isHomeMounted}
        firstLine={"OUR IT"}
        secondLine={"SERVICES"}
      />
      {/* <div className={style.servicesTitle}>
        <div className={style.headingText}>
          <h1 className="revealAnimationHeader">
            <span className="textLine">
              <span>OUR IT</span>
            </span>
            <span
              data-scroll
              data-scroll-speed="0.5"
              // data-target={`.${style.solutions}`}
              className={style.serviceIcon}
            >
              <ServicesIcon />
            </span>
            <span className="textLine">
              <span>SERVICES</span>
            </span>
          </h1>
        </div>
        <div className={style.servicesImg}>
          <img
            src={ItServices}
            data-scroll
            data-scroll-speed="-1.5"
            data-target={`.${style.services}`}
          />
        </div>
      </div> */}
      <ServicesContainer />
    </div>
  );
}

export default Services;

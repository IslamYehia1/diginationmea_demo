import { useContext, useEffect } from "react";
import gsap from "gsap";
import style from "./Services.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import laptopImg from "./laptop_coding.jpg";
import DevIcon from "./softwareDev.png";
import ConsultIcon from "./webDev.png";
import { MyContext } from "../../App";
import OldMac from "../Images/old_mac.jpg";
// import ItImg from "../Images/it.jpg";
import ItImg from "../Images/cables.jpg";
import { ReactComponent as Consultation } from "../../SVG/consultation.svg";
import { ReactComponent as Arabic } from "../../SVG/arabic.svg";
import { ReactComponent as Scan } from "../../SVG/scan.svg";
import { ReactComponent as OutSourcing } from "../../SVG/consultation.svg";
import { ReactComponent as Software } from "../../SVG/software.svg";
gsap.registerPlugin(ScrollTrigger);
function Services() {
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
      <div className={style.servicesTitle}>
        <div className={style.headingText}>
          <h3>Services</h3>
          <h1>OUR IT SERVICES</h1>
        </div>
        <div className={style.servicesImg}>
          <img src={ItImg} />
        </div>
      </div>

      <div className={style.servicesContainer}>
        {/* <div className={style.lineColumn}>
          <span class={style.lineContainer}>
            <span class={style.line}>
              <div class={style.pinnedLine}>
                <span class={`activeLine ${style.activeLine}`}></span>
              </div>
            </span>
          </span>
        </div> */}

        <div className={style.contentContainer}>
          <div className={style.servicesTitleContainer}>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Software />
                <h2>Software Consultancy </h2>
              </div>

              {/* <img src={DevIcon} /> */}
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <OutSourcing />

                <h2>Software development</h2>
              </div>

              {/* <img src={ConsultIcon} /> */}
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Scan />
                <h2> Document Automation</h2>
              </div>
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Consultation />
                <h2>Backlog Conversion</h2>
              </div>
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Consultation />
                <h2>Enterprise Integration</h2>
              </div>
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Consultation />

                <h2>Data Architecting</h2>
              </div>
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Consultation />

                <h2>Business Intelligence</h2>
              </div>
            </div>
            <div className={`content ${style.service}`}>
              <div className={style.title}>
                <Consultation />

                <h2>Resource Augmentation</h2>
              </div>
            </div>
          </div>
          <div className={style.descriptionContainer}>
            <div className={`${style.serviceDescription} ${style.active}`}>
              <h1>Software Consultency</h1>
              <p>
                We provide software consulting services to clients for strategic
                decision-making and improvement of their operative processes.{" "}
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                We offer full-cycle development services enabling businesses to
                be agile, futuristic and high-performing.{" "}
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                We design, build and integrate systems to deliver the most
                suitable solutions that improve manufacturing performance for
                companies.
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                We provide services to convert documents of all types to digital
                formats (TIFF, PDF, JPG, ...) We help your organization spur
                business growth by considering Enterprise Integration as an
                opportunity to embrace new architecture paradigms and patterns
                to drive time-to-market and vigorously improve infrastructure.
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                IT staff augmentation is a strategy to speed up delivery time or
                fill in resource gaps by hiring tech talents from an outsourcing
                vendor.{" "}
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                Having a solid data architecture plan in place will allow you to
                leverage and realize the full value of your data.{" "}
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                Our (BI) Business Intelligence Services will help you extract
                knowledge from your data, integrate it into (ETL).
              </p>
            </div>
            <div className={style.serviceDescription}>
              <p>
                IT staff augmentation is a strategy to speed up delivery time or
                fill in resource gaps by hiring tech talents from an outsourcing
                vendor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

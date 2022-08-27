import { useEffect } from "react";
import style from "./Solutions.module.scss";
import gsap from "gsap";
import SolutionCard from "./SolutionCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import useDrag from "../Common/useDrag";
import { LeftArrow, RightArrow } from "../Common/arrows";
// import PlanetImg from "../Images/planet.jpg";
// import PlanetImg from "../Images/board.jpg";
import PlanetImg from "../Images/server.jpg";
// import { ReactComponent as InfrastructureIcon } from "../../SVG/infrastructure_1.svg";
import { ReactComponent as InfrastructureIcon } from "../../SVG/infrastructure.svg";
import { ReactComponent as SolutionsIcon_1 } from "../../SVG/solution_1.svg";
import SectionSeperator from "../SectionsSeperator/SectionSeperator";
// import { ReactComponent as Software } from "../../SVG/software-development.svg";
import { ReactComponent as Software } from "../../SVG/software-development.svg";
// import { ReactComponent as BusinessIntelligenceIcon } from "../../SVG/business_application.svg";
import { ReactComponent as BusinessIntelligenceIcon } from "../../SVG/business_application.svg";
// import { ReactComponent as AIIcon } from "../../SVG/ai_1.svg";
import { ReactComponent as AIIcon } from "../../SVG/ai_1.svg";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
function Solutions({ isHomeMounted }) {
  useEffect(() => {
    gsap.utils.toArray(`.${style.solutionCard}`).forEach((card) => {
      const q = gsap.utils.selector(card);
      let hover = gsap
        .timeline({ paused: true })
        // .to(q(`.${style.normalTitle}`), {
        //   y: -34,
        //   duration: 0.4,
        // })
        .to(card, {
          scale: 1.05,
        })
        .fromTo(
          q(`.${style.cardHeading}`),
          { top: "20%", duration: 1.5 },
          {
            top: "10%",
          },
          "<"
        )
        .to(
          q(`.${style.solutionCard} ul`),
          {
            opacity: 1,
            duration: 0.3,
          },
          "<"
        )
        .to(
          q(`.${style.arrow}`),
          {
            x: 10,
            y: -10,
            duration: 0.3,
          },
          "<"
        );
      // .to(
      //   q(`.${style.coloredTitle}`),
      //   {
      //     y: -45,
      //     duration: 0.4,
      //   },
      //   "-=0.4"
      // )
      // .to(
      //   q(`.${style.cardHeading} svg`),
      //   {
      //     color: "#00b295",
      //     // width: "2.5rem",
      //   },
      //   "<"
      // );
      card.addEventListener("mouseenter", () => {
        hover.play();
      });
      card.addEventListener("mouseleave", () => hover.reverse());
    });
  }, []);

  return (
    <div className={`${style.solutions}`}>
      <SectionSeperator
        SectionImg={PlanetImg}
        Icon={SolutionsIcon_1}
        imgScrollTarget={style.solutions}
        isHomeMounted={isHomeMounted}
        firstLine={"Our IT"}
        secondLine={"Solutions"}
      />
      <HorizontalScroll
        itemClassName={style.solutionCard}
        // onWheel={onWheel}
        wrapperClassName={style.scrollMenuWrapper}
        separatorClassName={style.cardsSeperator}
        scrollContainerClassName={style.cards}
        arrowClassName={style.arrowBtn}
      >
        <SolutionCard
          itemId="0"
          Icon={Software}
          title={"Business Application"}
          listItems={[
            "Low-Code Applications",
            "Custom Applications",
            "Communication-Enabled Business",
            "Enterprise Content Management",
            "Application Integration",
          ]}
        />
        <SolutionCard
          itemId="1"
          Icon={BusinessIntelligenceIcon}
          title={"Business Intelligence"}
          listItems={[
            "Data Integration",
            "Data Virtualization",
            "Reporting & Analytics",
          ]}
        />

        <SolutionCard
          itemId="2"
          Icon={AIIcon}
          title={"AI Solutions"}
          listItems={[
            "Robotic Process Automation",
            "AI Chatbots",
            "Advanced Analytics",
          ]}
        />
        <SolutionCard
          itemId="3"
          Icon={InfrastructureIcon}
          title={"Infrastructure"}
          listItems={["Desktop Virtualization", "Identity Management / SSO"]}
        />
      </HorizontalScroll>
    </div>
  );
}

export default Solutions;

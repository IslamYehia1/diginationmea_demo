import { useEffect } from "react";
import style from "./Solutions.module.scss";
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
  return (
    <div className={`${style.solutions}`}>
      <SectionSeperator
        SectionImg={PlanetImg}
        Icon={SolutionsIcon_1}
        imgScrollTarget={style.solutions}
        isHomeMounted={isHomeMounted}
        firstLine={"Our IT"}
        secondLine={"Solutions"}
        linkToSection={"See Solutions"}
      />
      <HorizontalScroll
        itemClassName={style.horizontalCard}
        // onWheel={onWheel}
        wrapperClassName={style.scrollMenuWrapper}
        separatorClassName={style.cardsSeperator}
        scrollContainerClassName={style.cards}
        arrowClassName={style.arrowBtn}
      >
        <SolutionCard
          className={style.solutionCard}
          itemId="0"
          key={0}
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
          className={style.solutionCard}
          itemId="1"
          key={1}
          Icon={BusinessIntelligenceIcon}
          title={"Business Intelligence"}
          listItems={[
            "Data Integration",
            "Data Virtualization",
            "Reporting & Analytics",
          ]}
        />

        <SolutionCard
          className={style.solutionCard}
          itemId="2"
          key={2}
          Icon={AIIcon}
          title={"AI Solutions"}
          listItems={[
            "Robotic Process Automation",
            "AI Chatbots",
            "Advanced Analytics",
          ]}
        />
        <SolutionCard
          className={style.solutionCard}
          itemId="3"
          key={3}
          Icon={InfrastructureIcon}
          title={"Infrastructure"}
          listItems={["Desktop Virtualization", "Identity Management / SSO"]}
        />
      </HorizontalScroll>
    </div>
  );
}

export default Solutions;

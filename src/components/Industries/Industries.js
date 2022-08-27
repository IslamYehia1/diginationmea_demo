import Card from "../Card/Card";
import "./globalStyles.scss";
import React, { useEffect } from "react";
import HealthCareImg from "./healthCare2.jpg";
import EducationImg from "./education.jpg";
import FineTechImg from "./fineTech.jpg";
import BankingImg from "./banking.jpg";
import InsuranceImg from "./insurance.jpg";
import OilAndGas from "./oil_and_gas.jpg";
import style from "./Industries.module.scss";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
function Industries({ isHomeMounted }) {
  return (
    <div className={`${style.industriesSection} industriesSection`}>
      <div className={`${style.sectionTitle} animatedText`}>
        <h3>
          <span>Industries</span>
        </h3>
        <h1 className="revealAnimationHeader">
          We advised over 800 clients across KSA from all industries
          {/* <span className="textLine">
            <span>We advised over 800</span>
          </span>
          <span className="textLine">
            <span> clients across KSA </span>
          </span>
          <span className="textLine">
            <span>from all industries</span>
          </span> */}
        </h1>
      </div>
      <IndustryCards />
    </div>
  );
}

export function IndustryCards() {
  return (
    <div style={{ height: "100vh" }}>
      {/* <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}> */}
      <div className={style.scrollMenuContainer}>
        <HorizontalScroll
          itemClassName={style.card}
          separatorClassName={style.cardsSeperator}
          scrollContainerClassName={style.industryCards}
          arrowClassName={style.arrowBtn}
        >
          <Card
            title="Oil and gas"
            description={
              "We solve stuff alot of stuff meaning that we work with health care to care about health "
            }
            img={OilAndGas}
            itemId={"0"}
            key={0}
          ></Card>

          <Card
            title="Health Care"
            description={
              "Modern technological advancements have taken the business into a new era! It’s not technology optimizing business operations anymore, it’s new markets "
            }
            img={HealthCareImg}
            itemId={"1"}
            key={1}
          ></Card>
          <Card
            title="Insurance"
            description={
              "We help business to design a perfect path to their ultimate digital transformation. Taking into consideration to minimize "
            }
            img={InsuranceImg}
            itemId={"2"}
            key={2}
          ></Card>

          <Card
            title="Education"
            description={
              "We solve stuff alot of stuff meaning that we work with health care to care about health "
            }
            img={EducationImg}
            itemId={"3"}
            key={3}
          ></Card>
          <Card
            title="Financial sector"
            description={
              "We solve stuff alot of stuff meaning that we work with health care to care about health "
            }
            img={BankingImg}
            itemId={"4"}
            key={4}
          ></Card>
          <Card
            title="Communication"
            description={
              "We solve stuff alot of stuff meaning that we work with health care to care about health "
            }
            img={EducationImg}
            itemId={"5"}
            key={5}
          ></Card>
          <Card
            title="Government"
            description={
              "We solve stuff alot of stuff meaning that we work with health care to care about health "
            }
            img={EducationImg}
            itemId={"6"}
            key={6}
          ></Card>
        </HorizontalScroll>
      </div>
    </div>
  );
}

export default Industries;

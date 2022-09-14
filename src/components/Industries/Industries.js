import Card from "./Card";
import "./globalStyles.scss";
import React from "react";
import HealthCareImg from "../Images/healthCare3.jpg";
import EducationImg from "../Images/education.jpg";
import GovernmentImg from "../Images/government.jpg";
import CommunicationImg from "../Images/communication.jpg";
import BankingImg from "../Images/banking.jpg";
import InsuranceImg from "../Images/insurance.jpg";
import OilAndGas from "../Images/oil_and_gas.jpg";
import style from "./Industries.module.scss";
import cardStyle from "./Card.module.scss";

import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
function Industries() {
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
          itemClassName={cardStyle.cardWrapper}
          separatorClassName={style.cardsSeperator}
          scrollContainerClassName={style.industryCards}
          arrowClassName={style.arrowBtn}
          // wrapperClassName={style.scrollWrapper}
        >
          <Card
            title="Oil and gas"
            description={
              "We develop IT solutions to transform the oil and gas industry by reducing operational and maintenance costs, increasing efficiency, and optimizing operations."
            }
            img={OilAndGas}
            itemId={"0"}
            key={0}
          ></Card>

          <Card
            title="Health Care"
            description={
              "Digination solutions for health IT enable digital transformation by providing clinicians with instant access to patient information as they roam across facilities, devices and networks."
            }
            img={HealthCareImg}
            itemId={"1"}
            key={1}
          ></Card>
          <Card
            title="Insurance"
            description={
              "Hexaware’s Digital Insurance Services deliver transformative solutions to Insurers using AI, Cloud,  Robotic Process Automation (RPA), Machine Learning and other emerging technologies."
            }
            img={InsuranceImg}
            itemId={"2"}
            key={2}
          ></Card>

          <Card
            title="Education"
            description={
              "Our comprehensive on-premises and cloud IT management solutions for education industry will enable you to take complete control of your IT infrastructure and services, both on-campus and remote."
            }
            img={EducationImg}
            itemId={"3"}
            key={3}
          ></Card>
          <Card
            title="Financial sector"
            description={
              "Quickly detect and prevent fraud. Determine credit- and loan-worthiness.  We'll help you remove data obstacles like cloud latency and AI bottlenecks. "
            }
            img={BankingImg}
            itemId={"4"}
            key={4}
          ></Card>
          <Card
            title="Communication"
            description={
              "We offer IT and network support to multiple types of businesses within the telecom industry. "
            }
            img={CommunicationImg}
            itemId={"5"}
            key={5}
          ></Card>
          <Card
            title="Government"
            description={
              "We work with governments to increase their efficiency by building world-class IT services. Digitizing systems and processes enables governments to more effectively serve citizens. "
            }
            img={GovernmentImg}
            itemId={"6"}
            key={6}
          ></Card>
        </HorizontalScroll>
      </div>
    </div>
  );
}

export default Industries;

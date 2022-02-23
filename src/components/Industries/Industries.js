import Card from "../Card/Card";
// import { LeftArrow, RightArrow } from "./arrows";
// import { Card } from "./card";
// import { Footer } from "./footer";
// import { Header } from "./header";
import "./globalStyles.scss";
import usePreventBodyScroll from "./usePreventBodyScroll";
import React from "react";
import ReactDOM from "react-dom";
import { RightCircleOutlined } from "@ant-design/icons";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// NOTE: for arrows on bottom
// import "./arrowsOnBottomOrTop.css";
// NOTE: for hide scrollbar
// import "./hideScrollbar.css";
// import "./firstItemMargin.css";
import HealthCareImg from "./healthCare2.jpg";
import EducationImg from "./education.jpg";
import FineTechImg from "./fineTech.jpg";
import BankingImg from "./banking.jpg";
import style from "./Industries.module.scss";

function Industries() {
  return (
    <div className={`${style.industriesSection} industriesSection`}>
      <div className={style.sectionTitle}>
        <h3>Industries</h3>
        <h1> WE advised over 800 clients across KSA from all industries </h1>
      </div>

      {/* <div className={style.industryCards}> */}
      {/* <Card title="Health Care"></Card>
        <Card title="Health Care"></Card>
        <Card title="Health Care"></Card> */}
      {/* </div> */}
      <IndustryCards />
    </div>
  );
}

const elemPrefix = "test";
const getId = (index) => `${elemPrefix}${index}`;

// const getItems = () =>
//   Array(20)
//     .fill(0)
//     .map((_, ind) => ({ id: getId(ind) }));

export function IndustryCards() {
  //   const [items] = React.useState(getItems);
  //   const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <>
      <div style={{ height: "150vh" }}>
        {/* <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}> */}
        <div>
          <ScrollMenu
            // LeftArrow={
            //   <RightCircleOutlined
            //     className={style.rightArrow}
            //     twoToneColor="#52c41a"
            //   />
            // }
            // RightArrow={
            //   <RightCircleOutlined
            //     className={style.LeftArrow}
            //     twoToneColor="#52c41a"
            //   />
            // }
            transitionBehavior="smooth"
            itemClassName={style.card}
            wrapperClassName={style.industryCards}
            // onWheel={onWheel}
            separatorClassName={style.cardsSeperator}
          >
            {/* {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))} */}
            <Card
              title="Health Care"
              description={
                "Modern technological advancements have taken the business into a new era! It’s not technology optimizing business operations anymore, it’s new markets "
              }
              img={HealthCareImg}
            ></Card>
            <Card
              title="Fine Tech"
              description={
                "We help business to design a perfect path to their ultimate digital transformation. Taking into consideration to minimize "
              }
              img={FineTechImg}
            ></Card>
            <Card
              title="Banking"
              description={
                "We solve stuff alot of stuff meaning that we work with health care to care about health "
              }
              img={BankingImg}
            ></Card>
            <Card
              title="Education"
              description={
                "We solve stuff alot of stuff meaning that we work with health care to care about health "
              }
              img={EducationImg}
            ></Card>
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

export default Industries;

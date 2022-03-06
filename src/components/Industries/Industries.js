import Card from "../Card/Card";
// import { LeftArrow, RightArrow } from "./arrows";
// import { Card } from "./card";
// import { Footer } from "./footer";
// import { Header } from "./header";
import "./globalStyles.scss";
import usePreventBodyScroll from "../Common/usePreventBodyScroll";
import React from "react";
import ReactDOM from "react-dom";
import { RightCircleOutlined } from "@ant-design/icons";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import HealthCareImg from "./healthCare2.jpg";
import EducationImg from "./education.jpg";
import FineTechImg from "./fineTech.jpg";
import BankingImg from "./banking.jpg";
import style from "./Industries.module.scss";
import { ReactComponent as DownArrow } from "../../SVG/gradientArrow.svg";
import useDrag from "../Common/useDrag";
import { LeftArrow, RightArrow } from "../Common/arrows";

function Industries() {
  return (
    <div className={`${style.industriesSection} industriesSection`}>
      <div className={style.sectionTitle}>
        <h3>Industries</h3>
        <h1> We advised over 800 clients across KSA from all industries </h1>
      </div>
      <IndustryCards />
    </div>
  );
}

const elemPrefix = "test";
const getId = (index) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

export function IndustryCards() {
  //   const [items] = React.useState(getItems);
  //   const { disableScroll, enableScroll } = usePreventBodyScroll();
  const [items] = React.useState(getItems);
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState("");
  const handleItemClick = (itemId) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : "");
  };
  return (
    <div style={{ height: "100vh" }}>
      {/* <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}> */}
      <div onMouseLeave={dragStop} className={style.scrollMenuContainer}>
        <ScrollMenu
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
          LeftArrow={<LeftArrow></LeftArrow>}
          RightArrow={RightArrow}
          transitionBehavior="smooth"
          itemClassName={style.card}
          // wrapperClassName={}
          // onWheel={onWheel}
          separatorClassName={style.cardsSeperator}
          scrollContainerClassName={style.industryCards}
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
            itemId={"0"}
            key={0}
          ></Card>
          <Card
            title="Fine Tech"
            description={
              "We help business to design a perfect path to their ultimate digital transformation. Taking into consideration to minimize "
            }
            img={FineTechImg}
            itemId={"1"}
            key={1}
          ></Card>
          <Card
            title="Banking"
            description={
              "We solve stuff alot of stuff meaning that we work with health care to care about health "
            }
            img={BankingImg}
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
        </ScrollMenu>
      </div>
    </div>
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

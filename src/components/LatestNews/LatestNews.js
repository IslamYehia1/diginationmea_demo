import style from "./latestNews.module.scss";
import newsImg1 from "../Images/medical_city_news.png";
import newsImg2 from "../Images/automation_award.jpg";
import newsImg3 from "../Images/Yamama-Cement.jpg";
import newsImg4 from "../Images/booth.jpg";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import useDrag from "../Common/useDrag";
import { LeftArrow, RightArrow } from "../Common/arrows";
import { ReactComponent as LinkIndicator } from "../../SVG/linkIndicator.svg";
import { useState, useRef } from "react";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import gsap from "gsap";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const news = [
  {
    title:
      "KSA’s oldest medical city looks to the future with digital treatment",
    img: newsImg1,
    body: "Digital Information (DigiNation) scores a new achievement in the healthcare sector. With one of the largest ....",
  },
  {
    title:
      "KSA’s oldest medical city looks to the future with digital treatment",
    img: newsImg2,
    body: "DigiNation was awarded as “Emerging Partner Of the Year – KSA ” as part of the “Automation Anywhere” prestigious....",
  },
  {
    title:
      "KSA’s oldest medical city looks to the future with digital treatment",
    img: newsImg3,
    body: "Yamama Cement and Digination have collaborated together throughout the life cycle of the BI project. Through hardships...",
  },
  {
    title:
      "KSA’s oldest medical city looks to the future with digital treatment",
    img: newsImg4,
    body: "Digital Information (DigiNation) scores a new achievement in the healthcare sector. With one....",
  },
];
function LatestNews() {
  useEffect(() => {
    const cardsArr = gsap.utils.toArray(`.${style.newsCard}`);
    cardsArr.forEach((card) => {
      const cardScaleTl = gsap.timeline({ paused: true }).to(card, {
        scale: "1.03",
      });
      card.addEventListener("mouseover", () => {
        cardScaleTl.play();
      });
      card.addEventListener("mouseleave", () => {
        cardScaleTl.reverse();
      });
    });
  }, []);
  // cardsArr.forEach((card) => {

  // })
  return (
    <div className={style.latestNewsWrapper}>
      <div className={style.sectionTitle}>
        <h1>WHAT'S NEW</h1>
        <h2>The latest on our projects, awwards, and more. </h2>
      </div>

      <HorizontalScroll
        // itemClassName={style.newsCard}
        separatorClassName={style.cardsSeperator}
        scrollContainerClassName={style.newsCardsWrapper}
        wrapperClassName={style.horizontalScrollWrapper}
      >
        {news.map((newsPiece, index) => {
          return (
            <Link
              to="/news"
              className={style.newsCard}
              itemId={`${index}`}
              key={index}
            >
              <div className={style.imgWrapper}>
                <img src={newsPiece.img} alt="" />
              </div>
              <div className={style.cardTextWrapper}>
                <div className={style.cardText}>
                  <h2>{newsPiece.title}</h2>
                  <p>{newsPiece.body}</p>
                </div>
                <div className={style.linkIndicator}>
                  <LinkIndicator />
                </div>
              </div>
            </Link>
          );
        })}
      </HorizontalScroll>
    </div>
  );
}

export default LatestNews;

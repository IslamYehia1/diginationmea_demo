import { useEffect } from "react";
import style from "./Solutions.module.scss";
import gsap from "gsap";
import SolutionCard from "./SolutionCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { ReactComponent as Arrow } from "../../SVG/topRightArrow.svg";
import useDrag from "../Common/useDrag";
import { LeftArrow, RightArrow } from "../Common/arrows";
import PlanetImg from "../Images/planet.jpg";
import { ReactComponent as AiIcon } from "../../SVG/ai.svg";
import { ReactComponent as ChipIcon } from "../../SVG/chip.svg";
import { ReactComponent as ApplicationIcon } from "../../SVG/application.svg";
import { ReactComponent as InfrastructureIcon } from "../../SVG/infrastructure.svg";
function Solutions() {
  useEffect(() => {
    gsap.utils.toArray(`.${style.solutionCard}`).forEach((card) => {
      const q = gsap.utils.selector(card);
      let hover = gsap
        .timeline({ paused: true })
        .to(q(`.${style.normalTitle}`), {
          y: -34,
          duration: 0.4,
        })
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
        )
        .to(
          q(`.${style.coloredTitle}`),
          {
            y: -40,
            duration: 0.4,
          },
          "-=0.4"
        );
      card.addEventListener("mouseenter", () => {
        hover.play();
      });
      card.addEventListener("mouseleave", () => hover.reverse());
    });
  }, []);
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div className={style.solutions} onMouseLeave={dragStop}>
      <div className={style.solutionsHeading}>
        <div className={style.headingText}>
          <h3>Solutions</h3>
          <h1>OUR IT SOLUTIONS</h1>
        </div>
        <div className={style.headingImg}>
          <img src={PlanetImg} />
        </div>
      </div>
      <ScrollMenu
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        LeftArrow={<LeftArrow className={style.leftArrow} />}
        RightArrow={<RightArrow className={style.rightArrow} />}
        transitionBehavior="smooth"
        itemClassName={style.solutionCard}
        // onWheel={onWheel}
        wrapperClassName={style.scrollMenuWrapper}
        separatorClassName={style.cardsSeperator}
        scrollContainerClassName={style.cards}
      >
        <div itemId="0" className={style.cardContainer}>
          <Arrow className={style.arrow} />
          <div className={style.cardWrapper}>
            <div className={style.cardHeading}>
              <ApplicationIcon />
              <div className={style.cardTitle}>
                <h2 className={style.normalTitle}>Business Application</h2>
                <h3 className={style.coloredTitle}>Business Application</h3>
              </div>
            </div>

            <ul>
              <li>Low-Code Applications</li>
              <li>Custom Applications</li>
              <li>Communication-Enabled Business</li>
              <li>Enterprise Content Management</li>
              <li>Application Integration</li>
            </ul>
          </div>
        </div>
        <div itemId="1" className={style.cardContainer}>
          <Arrow className={style.arrow} />
          <div className={style.cardWrapper}>
            <div className={style.cardHeading}>
              <ChipIcon />
              <div className={style.cardTitle}>
                <h2 className={style.normalTitle}>Business Intelligence</h2>
                <h3 className={style.coloredTitle}>Business Intelligence</h3>
              </div>
            </div>
            <ul>
              <li>Data Integration</li>
              <li>Data Virtualization</li>
              <li>Reporting & Analytics</li>
            </ul>
          </div>
        </div>
        <div itemId="2" className={style.cardContainer}>
          <Arrow className={style.arrow} />
          <div className={style.cardWrapper}>
            <div className={style.cardHeading}>
              <AiIcon />
              <div className={style.cardTitle}>
                <h2 className={style.normalTitle}>AI Solutions</h2>
                <h3 className={style.coloredTitle}>AI Solutions</h3>
              </div>
            </div>
            <ul>
              <li>Robotic Process Automation</li>
              <li>AI Chatbots</li>
              <li>Advanced Analytics</li>
            </ul>
          </div>
        </div>
        <div itemId="3" className={style.cardContainer}>
          <Arrow className={style.arrow} />
          <div className={style.cardWrapper}>
            <div className={style.cardHeading}>
              <InfrastructureIcon />
              <div className={style.cardTitle}>
                <h2 className={style.normalTitle}>Infrastructure</h2>
                <h3 className={style.coloredTitle}>Infrastructure</h3>
              </div>
            </div>
            <ul>
              <li>Desktop Virtualization</li>
              <li>Identity Management / SSO</li>
            </ul>
          </div>
        </div>
      </ScrollMenu>
    </div>
  );
}

export default Solutions;

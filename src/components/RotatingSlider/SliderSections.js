import Section from "./Section";
import style from "./RotatingSlider.module.scss";
import outSystems from "../Images/outsystems.mp4";
import outSystemsApp from "../Images/outsystems_app.mp4";
import altyrex from "../Images/altyrex.jpg";
import qlik from "../Images/qlik.png";
import chatbot from "../Images/chatbot.png";
import openText from "../Images/openText.jpg";
import powerBI from "../Images/powerBI.png";
import LinkBtn from "../Button/LinkBtn";

function SliderSections({ onLoad, currentSection }) {
  return (
    <>
      <Section
        video={outSystems}
        video2={outSystemsApp}
        className={`${style.colors0}`}
        onLoad={() => {
          onLoad();
        }}
      >
        <h3 className={style.slideTitle}>
          First Digination will help you transform your existing infrastructure
        </h3>
        <LinkBtn to="/partners/" className={style.learnMoreBtn}>
          <span>Learn More</span>
        </LinkBtn>
      </Section>
      <Section img={altyrex} className={`${style.colors1} `}>
        <h3 className={style.slideTitle}>
          second Digination will help you transform your existing infrastructure
        </h3>
        <LinkBtn to="/partners/" className={style.learnMoreBtn}>
          <span>Learn More</span>
        </LinkBtn>
      </Section>
      <Section img={powerBI} className={`${style.colors5} `}>
        <h3 className={style.slideTitle}>
          All apps running on cloud. Vendor manages Platform and infra. ML-led
          decision making.
        </h3>
        <LinkBtn to="/partners/" className={style.learnMoreBtn}>
          <span>Learn More</span>
        </LinkBtn>
      </Section>
      <Section img={qlik} className={`${style.colors2} `}>
        <h3 className={style.slideTitle}>
          Third Digination will help you transform your existing infrastructure
        </h3>
        <LinkBtn to="/partners/" className={style.learnMoreBtn}>
          <span>Learn More</span>
        </LinkBtn>
      </Section>
      <Section img={chatbot} className={`${style.colors3} `}>
        <h3 className={style.slideTitle}>
          Fourth Digination will help you transform your existing infrastructure
        </h3>
        <LinkBtn to="/partners/" className={style.learnMoreBtn}>
          <span>Learn More</span>
        </LinkBtn>
      </Section>
      <Section img={openText} className={`${style.colors4} `}>
        <h3 className={style.slideTitle}>
          All applications are built on modern, and unified platform, CI/CD
          pipeline and DevOps practices applied
        </h3>
        <LinkBtn to="/partners/" className={style.learnMoreBtn}>
          <span>Learn More</span>
        </LinkBtn>
      </Section>
    </>
  );
}

export default SliderSections;

import gsap from "gsap";
import style from "./Services.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesContainer from "./ServicesContainer";
import { ReactComponent as ServicesIcon } from "../../SVG/cloud-computing.svg";
import ItServices from "../Images/board.jpg";
import SectionSeperator from "../SectionsSeperator/SectionSeperator";

gsap.registerPlugin(ScrollTrigger);
function ServicesSection({ isHomeMounted }) {
  return (
    <div className={`${style.services} services`}>
      <SectionSeperator
        SectionImg={ItServices}
        isHomeMounted={isHomeMounted}
        Icon={ServicesIcon}
        imgScrollTarget={style.services}
        firstLine={"Our IT"}
        secondLine={"Services"}
        linkToSection={"See Services"}
      />

      <ServicesContainer className={`${style.servicesContainer}`} />
    </div>
  );
}

export default ServicesSection;

import style from "./ServicesPage.module.scss";
import { ReactComponent as ITIcon } from "../SVG/technical-support.svg";
import ServicesContainer from "../components/Services/ServicesContainer";
import PlantImg from "../components/Images/planet_connections.jpg";
import { useContext, useEffect, useRef } from "react";
import { MyContext } from "../App";
import { useLocoscroll } from "../components/Common/useLocoscroll";
import ServerImg from "../components/Images/server.png";
import TransformationSteps from "./TransformationSteps";
import { useState } from "react";

function Services() {
  const { isAppMounted } = useContext(MyContext);
  const scrollRef = useRef(null);
  const locoScroll = useLocoscroll(scrollRef, 0.7);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div
      ref={scrollRef}
      className={style.servicesPage}
      data-scroll-container
      data-scroll-position="top"
    >
      <div className={style.headingContainer}>
        <div className={style.heading}>
          <div className={style.headingTitle}>
            <div className={style.firstColumn}>
              <h1 className={style.firstRow}>
                What we can do for your company
                {/* <ITIcon />{" "} */}
              </h1>
              <div className={style.secondRow}>
                <h3>SERVICES</h3>
                <p>
                  DigiNation is a leading digital business automation company in
                  KSA that offered successful business solutions to over 800
                  clients across the region.
                </p>
              </div>
            </div>
            {/* <div className={style.secondColumn}>
              <img src={ServerImg} />
            </div> */}
          </div>

          {/* <div className={style.headingImg}>
            <img src={PlantImg} />
          </div> */}
        </div>
      </div>

      <ServicesContainer className={style.servicesContainer} />
      <TransformationSteps isPageMounted={isMounted} />
    </div>
  );
}
export default Services;

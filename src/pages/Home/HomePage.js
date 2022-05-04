import TransformationStory from "../../components/TransformationStory/TransformationStory";
import Industries from "../../components/Industries/Industries";
import PageFooter from "../../components/Footer/Footer";
import Solutions from "../../components/Solutions/Solutions";
import Services from "../../components/Services/Services";
import LandingPage from "../../components/LandingPage/LandingPage";
import { useLocoscroll } from "../../components/Common/useLocoscroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { MyContext } from "../../App";
import style from "./HomePage.module.scss";
function HomePage() {
  const { isAppMounted } = useContext(MyContext);
  const scrollRef = useRef(null);
  // const locoScroll = useLocoscroll(scrollRef);
  const locoScroll = useLocoscroll(scrollRef, 0.7);
  const [isHomeMounted, setIsHomeMounted] = useState(false);
  useEffect(() => {
    setIsHomeMounted(true);

    return () => {
      setIsHomeMounted(false);
    };
  }, []);
  useEffect(() => {
    // if (!isAppMounted) return;
  }, []);
  return (
    <div
      ref={scrollRef}
      // data-scroll-container
      // data-scroll-speed="1"
      // data-scroll-position="top"
      className="HomePageContainer"
      data-scroll-container
      data-scroll-position="top"
    >
      <LandingPage isHomeMounted={isHomeMounted} />
      <TransformationStory isHomeMounted={isHomeMounted} />
      <Industries isHomeMounted={isHomeMounted} />
      <Solutions isHomeMounted={isHomeMounted} />
      <Services isHomeMounted={isHomeMounted} />
      <PageFooter />
    </div>
  );
}

export default HomePage;

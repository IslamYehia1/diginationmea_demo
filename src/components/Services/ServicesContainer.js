import style from "./Services.module.scss";
import laptopImg from "./laptop_coding.jpg";
import DevIcon from "./softwareDev.png";
import ConsultIcon from "./webDev.png";
import OldMac from "../Images/old_mac.jpg";
// import ItImg from "../Images/it.jpg";
import { ReactComponent as ConsultationIcon } from "../../SVG/technical-support.svg";
// import { ReactComponent as Consultation } from "../../SVG/consultation.svg";
import { ReactComponent as Consultation } from "../../SVG/data-network.svg";
import { ReactComponent as Software } from "../../SVG/software-development.svg";
import { ReactComponent as Backlog1 } from "../../SVG/backlog_2.svg";
// import { ReactComponent as IntegrationIcon } from "../../SVG/integration2.svg";
import { ReactComponent as IntegrationIcon } from "../../SVG/connection.svg";
import { ReactComponent as ScannerIcon } from "../../SVG/scanner.svg";
import { ReactComponent as RightArrow } from "../../SVG/right-arrow.svg";
import { ReactComponent as AIIcon } from "../../SVG/ai.svg";
import { ReactComponent as ResourceAugIcon } from "../../SVG/competition.svg";
import { ReactComponent as BusinessIntelligenceIcon } from "../../SVG/business_application.svg";

import gsap from "gsap";
import { useEffect, useState } from "react";
function ServicesContainer({ className }) {
  const [currentService, setCurrentService] = useState("0");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 999;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  });
  useEffect(() => {
    gsap.set(`.${style.mobileDescription}`, {
      autoAlpha: 1,
    });
    gsap.fromTo(
      `.${style.serviceDescription}`,
      {
        y: "400",
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
      }
    );
    if (isMobile) {
      gsap
        .timeline()
        .from(`.${style.mobileDescription}`, {
          height: 0,
        })
        .to(
          `.${style.mobileDescription} span`,
          {
            autoAlpha: 1,
          },
          "<+=50%"
        );
      // gsap.fromTo(
      //   `.${style.mobileDescription}`,
      //   {
      //     scaleY: 0,
      //   },
      //   {
      //     scaleY: 1,
      //     transformOrigin: "top center",
      //   }
      // );
    }
  }, [currentService, isMobile]);

  function handleServiceHover(e) {
    let q = gsap.utils.selector(e.currentTarget);
    gsap.to(q(`.rightArrow`), {
      width: "2rem",
      duration: 0.5,
      ease: "power3.easeOut",
    });
    // gsap.to(q(`.${style.serviceIcon}`), {
    //   width: "4rem",
    //   duration: 0.5,
    //   ease: "power3.easeIn",
    // });
    // gsap.to(q(`.rightArrow`), {
    //   width: "2rem",
    //   duration: 0.5,
    //   ease: "power3.easeOut",
    // });
  }
  function handleServiceLeave(e) {
    let q = gsap.utils.selector(e.currentTarget);
    gsap.to(q(`.rightArrow`), {
      width: "0",
      duration: 0.5,
      ease: "power3.easeIn",
    });
    // gsap.to(q(`.${style.serviceIcon}`), {
    //   width: "3rem",
    //   duration: 0.5,
    //   ease: "power3.easeIn",
    // });
  }
  function expandOnMobile(target) {
    // gsap.to(target, {
    //   height: "200%",
    // });
  }
  const services = [
    {
      title: "Software Consultancy",
      ServiceIcon: ConsultationIcon,
      description:
        "We provide software consulting services to clients for strategic decision-making and improvement of their operative processes.",
    },
    {
      title: "Software development",
      ServiceIcon: Software,
      description:
        "We offer full-cycle development services enabling businesses to be agile, futuristic and high-performing.",
    },
    {
      title: "Document Automation",
      ServiceIcon: ScannerIcon,
      description:
        " We design, build and integrate systems to deliver the most suitable solutions that improve manufacturing performance for companies.",
    },
    {
      title: "Backlog Conversion",
      ServiceIcon: Backlog1,
      description:
        "We provide services to convert documents of all types to digital formats (TIFF, PDF, JPG, ...) We help your organization spur business growth by considering Enterprise Integration as an opportunity to embrace new architecture paradigms and patterns to drive time-to-market and vigorously improve infrastructure.",
    },
    {
      title: "Enterprise Integration",
      ServiceIcon: IntegrationIcon,
      description:
        "IT staff augmentation is a strategy to speed up delivery time or fill in resource gaps by hiring tech talents from an outsourcing vendor.",
    },
    {
      title: "Data Architecting",
      ServiceIcon: Consultation,
      description:
        "Having a solid data architecture plan in place will allow you to leverage and realize the full value of your data.",
    },
    {
      title: "Business Intelligence",
      ServiceIcon: BusinessIntelligenceIcon,
      description:
        "Our (BI) Business Intelligence Services will help you extract knowledge from your data, integrate it into (ETL).",
    },
    {
      title: "Resource Augmentation",
      ServiceIcon: ResourceAugIcon,
      description:
        " IT staff augmentation is a strategy to speed up delivery time or fill in resource gaps by hiring tech talents from an outsourcing vendor",
    },
  ];
  return (
    <div className={`${style.servicesContainer} ${className}`}>
      <div className={style.contentContainer}>
        <div className={style.servicesTitleContainer}>
          {services.map(({ title, ServiceIcon, description }, index) => {
            return (
              <div
                className={`content ${style.service}  ${
                  currentService == index ? style.activeService : ""
                }`}
                data-active-service="softwareConsultancy"
                onMouseEnter={isMobile ? undefined : handleServiceHover}
                onMouseLeave={isMobile ? undefined : handleServiceLeave}
                onClick={(e) => {
                  setCurrentService(`${index}`);
                  if (isMobile) {
                    expandOnMobile(e.currentTarget);
                  }
                }}
              >
                <div className={style.title}>
                  <ServiceIcon className={style.serviceIcon} />
                  {!isMobile && (
                    <RightArrow className={`${style.rightArrow} rightArrow`} />
                  )}
                  <h2>{title} </h2>
                </div>
                {currentService == `${index}` && isMobile && (
                  <div className={style.mobileDescription}>
                    <span>{description}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isMobile && (
          <div
            className={style.descriptionContainer}
            data-active-service="softwareConsultancy"
          >
            {currentService === "0" && (
              <div className={`${style.serviceDescription} ${style.active}`}>
                <h1>Software Consultency</h1>
                <p>
                  We provide software consulting services to clients for
                  strategic decision-making and improvement of their operative
                  processes.{" "}
                </p>
              </div>
            )}
            {currentService === "1" && (
              <div className={style.serviceDescription}>
                <h1>Software development</h1>
                <p>
                  We offer full-cycle development services enabling businesses
                  to be agile, futuristic and high-performing.{" "}
                </p>
              </div>
            )}
            {currentService === "2" && (
              <div className={style.serviceDescription}>
                <h1>Document Automation</h1>
                <p>
                  We design, build and integrate systems to deliver the most
                  suitable solutions that improve manufacturing performance for
                  companies.
                </p>
              </div>
            )}
            {currentService === "3" && (
              <div className={style.serviceDescription}>
                <h1>Backlog Conversion</h1>

                <p>
                  We provide services to convert documents of all types to
                  digital formats (TIFF, PDF, JPG, ...) We help your
                  organization spur business growth by considering Enterprise
                  Integration as an opportunity to embrace new architecture
                  paradigms and patterns to drive time-to-market and vigorously
                  improve infrastructure.
                </p>
              </div>
            )}
            {currentService === "4" && (
              <div className={style.serviceDescription}>
                <h1>Enterprise Integration</h1>
                <p>
                  IT staff augmentation is a strategy to speed up delivery time
                  or fill in resource gaps by hiring tech talents from an
                  outsourcing vendor.{" "}
                </p>
              </div>
            )}
            {currentService === "5" && (
              <div className={style.serviceDescription}>
                <h1>Data Architecting</h1>
                <p>
                  Having a solid data architecture plan in place will allow you
                  to leverage and realize the full value of your data.{" "}
                </p>
              </div>
            )}
            {currentService === "6" && (
              <div className={style.serviceDescription}>
                <h1>Business Intelligence</h1>
                <p>
                  Our (BI) Business Intelligence Services will help you extract
                  knowledge from your data, integrate it into (ETL).
                </p>
              </div>
            )}
            {currentService === "7" && (
              <div className={style.serviceDescription}>
                <h1>Resource Augmentation</h1>
                <p>
                  IT staff augmentation is a strategy to speed up delivery time
                  or fill in resource gaps by hiring tech talents from an
                  outsourcing vendor
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default ServicesContainer;

import { useEffect, useState } from "react";
import style from "./RotatingSlider.module.scss";
function Section({
  img,
  onLoad,
  isEven,
  currentSectionIndex,
  index,
  colors,
  isImageBehind,
  Text,
  Title,
  children,
  IMGStyle,
  className,
  video,
  video2,
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    if (isVideoLoaded || isImgLoaded) onLoad();
  }, [isVideoLoaded]);
  return (
    <div className={`${style.storySection} ${className}`} style={{}}>
      <div className={style.description}>
        <div className={style.descriptionText}>{children}</div>
      </div>
      <div className={style.image}>
        {video && (
          <video
            onCanPlay={() => {
              setIsVideoLoaded(1);
            }}
            autoPlay
            muted
            loop
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        {video2 && (
          <video autoPlay muted loop>
            <source src={video2} type="video/mp4" />
          </video>
        )}
        {!video && (
          <img
            onLoad={() => {
              setIsImgLoaded(true);
            }}
            src={img}
          />
        )}
      </div>
    </div>
  );
}

export default Section;

import style from "./TransformationStory.module.scss";
function Section({
  img,
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
}) {
  return (
    <div className={`${style.storySection} ${className}`} style={{}}>
      <div className={style.description}>
        <div className={style.descriptionText}>{children}</div>
      </div>
      <div className={style.image}>
        {video && (
          <video autoPlay muted loop>
            <source src={img} type="video/mp4" />
          </video>
        )}
        {!video && <img src={img} />}
      </div>
    </div>
  );
}

export default Section;

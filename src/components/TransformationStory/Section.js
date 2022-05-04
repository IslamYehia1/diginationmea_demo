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
}) {
  return (
    <div
      // className={`pagePart firstSection ${isEven ? "even" : "odd"} ${
      //   colors[index]
      // }`}
      className={`storySection ${className}`}
      // ref={currentSectionIndex === 0 ? visibleRef : null}
      style={
        {
          // visibility: currentSectionIndex === index ? "visible" : "hidden",
        }
      }
    >
      <div
        className="description"
        // style={{ zIndex: isImageBehind ? 2 : "initial" }}
      >
        <div className="descriptionText">{children}</div>
      </div>
      <div
        className={"image"}
        // style={{ zIndex: isImageBehind ? "initial" : 2, ...IMGStyle }}
      >
        <img src={img} />
      </div>
    </div>
  );
}

export default Section;

import style from "./HorizontalScroll.module.scss";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "../Common/arrows";
import usePreventBodyScroll from "../Common/usePreventBodyScroll";
import useDrag from "../Common/useDrag";
function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function HorizontalScroll({
  children,
  itemClassName,
  separatorClassName,
  scrollContainerClassName,
  wrapperClassName,
  arrowClassName,
}) {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });
  //   const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <ScrollMenu
      onMouseDown={() => dragStart}
      onMouseUp={() => dragStop}
      onMouseMove={handleDrag}
      LeftArrow={
        <LeftArrow
          className={`${arrowClassName} ${style.leftArrow} ${style.arrowBtn}`}
        />
      }
      RightArrow={
        <RightArrow
          className={`${arrowClassName} ${style.rightArrow} ${style.arrowBtn}`}
        />
      }
      onMouseLeave={dragStop}
      itemClassName={itemClassName}
      wrapperClassName={wrapperClassName}
      // onWheel={onWheel}
      separatorClassName={separatorClassName}
      scrollContainerClassName={scrollContainerClassName}
    >
      {children}
    </ScrollMenu>
  );
}

export default HorizontalScroll;

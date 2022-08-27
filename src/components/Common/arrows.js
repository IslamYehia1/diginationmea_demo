import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { ReactComponent as RightArrowIcon } from "./arrow.svg";
function Arrow({ children, className, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        padding: "0",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
        backgroundColor: "transparent",
        border: "none",
        height: "50px",
        width: "50px",
        // marginRight: "30px",
        // marginBottom: "30px",
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow({ className }) {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      className={className}
      disabled={disabled}
      onClick={() => scrollPrev()}
    >
      <div class={`chevron-d leftNavigationCircle`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55">
          {/* <path
            class="leftBtnCircle"
            d="M27.5 2C41.6 2 53 13.4 53 27.5S41.6 53 27.5 53 2 41.6 2 27.5 13.4 2 27.5 2M27.5 0C12.3 0 0 12.3 0 27.5S12.3 55 27.5 55 55 42.7 55 27.5 42.7 0 27.5 0L27.5 0z"
            fill="currentColor"
          /> */}
          <circle
            class="leftBtnCircle"
            r="48%"
            cy="50%"
            cx="50%"
            fill="currentColor"
          />

          <polygon
            class="arrow"
            points="34.9 31 28.5 35 28.5 17 26.5 17 26.5 35 20.1 31 19 32.7 27.5 38 36 32.7"
            fill="currentColor"
          />
          <polygon
            class="arrow-2"
            points="34.9 31 28.5 35 28.5 17 26.5 17 26.5 35 20.1 31 19 32.7 27.5 38 36 32.7"
            fill="currentColor"
          />
        </svg>
      </div>
    </Arrow>
  );
}

export function RightArrow({ className }) {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);
  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow
      disabled={disabled}
      onClick={() => {
        scrollNext();
      }}
      className={className}
    >
      <div class={`chevron-d rightNavigationCircle`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 55">
          {/* <path
            class="rightBtnCircle"
            d="M27.5 2C41.6 2 53 13.4 53 27.5S41.6 53 27.5 53 2 41.6 2 27.5 13.4 2 27.5 2M27.5 0C12.3 0 0 12.3 0 27.5S12.3 55 27.5 55 55 42.7 55 27.5 42.7 0 27.5 0L27.5 0z"
            fill="currentColor"
          /> */}
          <circle
            class="rightBtnCircle"
            r="48%"
            cy="50%"
            cx="50%"
            fill="currentColor"
          />

          <polygon
            class="arrow"
            points="34.9 31 28.5 35 28.5 17 26.5 17 26.5 35 20.1 31 19 32.7 27.5 38 36 32.7 "
          />
          <polygon
            class="arrow-2"
            points="34.9 31 28.5 35 28.5 17 26.5 17 26.5 35 20.1 31 19 32.7 27.5 38 36 32.7 "
          />
        </svg>
      </div>
    </Arrow>
  );
}

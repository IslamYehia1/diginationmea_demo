import style from "./PageLoader.module.scss";
import { ReactComponent as Logo } from "../../SVG/black_logo.svg";
function PageLoader() {
  return (
    <div className="pageLoaderWrapper">
      <div className="container">
        <div className="loader">
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          <div className="loader--dot"></div>
          {/* <div class="loader--text"></div> */}
        </div>
      </div>

      {/* <div class="pageLoaderLogo">
        <div className="pageLoaderVisibleLogo">
          <Logo />
        </div>
        <div className="pageLoaderHiddenLogo">
          <Logo />
        </div>
      </div> */}
    </div>
  );
}

export default PageLoader;

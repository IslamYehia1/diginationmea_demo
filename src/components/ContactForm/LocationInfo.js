import style from "./ContactForm.module.scss";
import LocationImg from "../Images/gathering_1.jpg";
function LocationInfo() {
  return (
    <div className={style.locationInfoWrapper}>
      <div className={style.locationImg}>
        <img src={LocationImg} />
      </div>
      <div className={style.locationInfo}>
        <div className={style.locationInfoText}>
          <h1>Come Say Hello </h1>
          <p>
            We’re proud to be a part of the inspiring and innovative community
            at .
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocationInfo;

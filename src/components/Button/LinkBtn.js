import style from "./LinkBtn.module.scss";
import { Link } from "react-router-dom";
import gsap from "gsap";
function LinkBtn({ to, className, children, areaLabel }) {
  return (
    <Link
      aria-label={areaLabel}
      to={to}
      className={`${style.linkBtn} ${className}`}
    >
      {children}
    </Link>
  );
}
export default LinkBtn;

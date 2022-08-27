import style from "./LinkBtn.module.scss";
import { Link } from "react-router-dom";
function LinkBtn({ to, className, children }) {
  return (
    <Link to={to} className={`${style.linkBtn} ${className}`}>
      {children}
    </Link>
  );
}
export default LinkBtn;

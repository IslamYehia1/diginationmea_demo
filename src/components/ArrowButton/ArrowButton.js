import style from "./ArrowButton.module.scss";

function ArrowButton({ Icon, label }) {
  return (
    <button className={style.arrowButton}>
      <p>{label}</p>
      <Icon />{" "}
    </button>
  );
}

export default ArrowButton;

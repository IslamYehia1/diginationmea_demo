import style from "./Button.module.scss";
function Button({ id, Icon, label, className }) {
  return (
    <button id={id} className={`${style.button} ${className}`}>
      {" "}
      <p>{label}</p>
      {Icon && <Icon />}
    </button>
  );
}

export default Button;

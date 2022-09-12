import style from "./Button.module.scss";
function Button({ id, Icon, label, className }) {
  return (
    <button
      name={`${label} button`}
      id={id}
      className={`${style.button} ${className}`}
      aria-label={`${label} button`}
    >
      {" "}
      <p>{label}</p>
      {Icon && <Icon />}
    </button>
  );
}

export default Button;

import style from "./Button.module.scss";
function Button({ id, Icon, label, className, style }) {
  return (
    <button id={id} className={className} style={style}>
      {" "}
      <p>{label}</p>
      <Icon />
    </button>
  );
}

export default Button;

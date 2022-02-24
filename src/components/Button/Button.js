import style from "./Button.module.scss";
function Button({ id, Icon, label, className }) {
  return (
    <button id={id} className={className}>
      {" "}
      <p>{label}</p>
      <Icon />
    </button>
  );
}

export default Button;

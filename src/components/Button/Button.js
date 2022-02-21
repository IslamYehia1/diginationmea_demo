import style from "./Button.module.scss";
function Button({ Icon, label, className }) {
  return (
    <button className={className}>
      {" "}
      <p>{label}</p>
      <Icon />
    </button>
  );
}

export default Button;

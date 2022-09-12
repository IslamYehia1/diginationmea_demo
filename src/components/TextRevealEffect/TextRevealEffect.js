// This is different than the typewriter effect used in the landingpage
import { useEffect } from "react";
import style from "./TextRevealEffect.module.scss";
import gsap from "gsap";
function TextRevealEffect({ children, className, isParentPageMounted }) {
  useEffect(() => {
    gsap
      .timeline()
      .set(`.${style.elementToReveal}`, { opacity: 1 })
      .from(`.${style.elementToReveal} ${className}`, {
        duration: 1.8,
        skewY: 7,
        y: 150,
        ease: "power4.out",
        stagger: {
          amount: 0.3,
        },
      });
  }, []);
  return (
    <div className={style.elementToRevealWrapper}>
      <div className={`${style.elementToReveal}`}>{children}</div>
    </div>
  );
}

export default TextRevealEffect;

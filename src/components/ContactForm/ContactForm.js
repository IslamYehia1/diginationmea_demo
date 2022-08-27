import React, { useState } from "react";
import style from "./ContactForm.module.scss";
import Button from "../Button/Button";
const FORM_ENDPOINT = ""; // TODO - fill on the later step

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <h2>Thank you!</h2>
        <div>We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <div className={style.contactFormWrapper}>
      <div className={style.firstColumn}>
        <h1 className={style.formTitle}>Ready to get to work?</h1>
      </div>
      <div className={style.secondColumn}>
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="POST"
          target="_blank"
          className={style.contactForm}
        >
          <div className={style.inputField}>
            <input type="text" placeholder="Your name" name="name" required />
          </div>
          <div className={style.inputField}>
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div className={style.inputField}>
            <textarea placeholder="Your message" name="message" required />
          </div>
          <div className={style.inputField}>
            <Button
              className={style.submitBtn}
              label="Send a message"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

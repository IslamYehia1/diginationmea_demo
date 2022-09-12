import React, { useState } from "react";
import style from "./ContactForm.module.scss";
import Button from "../Button/Button";
import { ReactComponent as EmailIcon } from "../../SVG/email.svg";
import { ReactComponent as PhoneIcon } from "../../SVG/phone-call.svg";
import { useEffect } from "react";
import LocationImg from "../Images/gathering_1-min.jpg";

const FORM_ENDPOINT = ""; // TODO

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
    <>
      <div className={style.contactFormWrapper}>
        <div className={style.firstColumn}>
          <h1 className={style.formTitle}>Ready to get to work?</h1>
          <div className={style.contactInfoWrapper}>
            <EmailIcon />
            <p className={style.contactInfo}>info@diginationmea.com</p>
          </div>

          <div className={style.contactInfoWrapper}>
            <PhoneIcon />
            <p className={style.contactInfo}>+966112399809</p>
          </div>
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
      <div className={style.locationInfoWrapper}>
        <div className={style.locationImg}>
          <img src={LocationImg} />
        </div>
        <div className={style.locationInfo}>
          <div className={style.locationInfoText}>
            <h1>Come Join Us </h1>
            <p>
              We’re proud to be a part of the inspiring and innovative community
              at Riyadh, Saudi Arabia.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;

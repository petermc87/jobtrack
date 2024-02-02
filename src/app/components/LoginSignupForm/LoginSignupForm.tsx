"use client";

import { Form } from "react-bootstrap";
import GoogleButton from "../GoogleButton/GoogleButton";
import InputField from "../InputField/InputField";
import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./LoginSignupForm.module.scss";

export default function LoginSignupForm() {
  return (
    <>
      <Form className={styles.formWrapper}>
        <Form.Group className={styles.topContainer}>
          <Logo />
          <h1 className={styles.heading}>Sign Up</h1>
          <InputField placeholderText="FULLNAME" />
          <InputField placeholderText="USERNAME" />
          <InputField placeholderText="EMAIL" />
          <InputField placeholderText="PASSWORD" />
        </Form.Group>
        <LoginButtonSignUpButton buttonChoice="login" />
        <h1 className={styles.heading}>OR</h1>
        <Form.Group className={styles.bottomContainer}>
          <GoogleButton />
          <h2>
            Already have an account? <span>Log In</span>
          </h2>
        </Form.Group>
      </Form>
    </>
  );
}

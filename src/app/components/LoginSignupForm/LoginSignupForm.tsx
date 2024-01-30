"use client";

import { Form } from "react-bootstrap";
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
          <h1>Log In</h1>
          <InputField placeholderText="FULLNAME" />
          <InputField placeholderText="USERNAME" />
          <InputField placeholderText="EMAIL" />
          <InputField placeholderText="PASSWORD" />
        </Form.Group>
        <LoginButtonSignUpButton buttonChoice={false} />
        <h1>OR</h1>
        <Form.Group className={styles.bottomContainer}>BOTTOM</Form.Group>
      </Form>
    </>
  );
}

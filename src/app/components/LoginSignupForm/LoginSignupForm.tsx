"use client";

import { openForm } from "@/app/redux/features/signupSlice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import GoogleButton from "../GoogleButton/GoogleButton";
import InputField from "../InputField/InputField";
import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./LoginSignupForm.module.scss";

export default function LoginSignupForm() {
  // Instantiate the state update event
  const dispatch = useDispatch<AppDispatch>();

  // Changing the form type.
  const handleFormType = (currentState: string) => {
    dispatch(openForm(currentState));
  };

  // Get current state of the form.
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);
  return (
    <>
      <Form className={styles.formWrapper}>
        <Form.Group className={styles.topContainer}>
          <Logo />
          <h1 className={styles.heading}>
            {isOpen === "signup" ? "Sign Up" : "Log In"}
          </h1>
          {isOpen === "signup" && (
            <>
              <InputField placeholderText="FULLNAME" />
              <InputField placeholderText="USERNAME" />
            </>
          )}

          <InputField placeholderText="EMAIL" />
          <InputField placeholderText="PASSWORD" />
        </Form.Group>
        {isOpen === "signup" ? (
          <LoginButtonSignUpButton buttonChoice={isOpen} />
        ) : (
          <LoginButtonSignUpButton buttonChoice={isOpen} />
        )}
        <h1 className={styles.heading}>OR</h1>
        <Form.Group className={styles.bottomContainer}>
          <GoogleButton />
          <h2>
            {isOpen === "signup"
              ? "Already have an account?"
              : "Dont have an account?"}{" "}
            <span
              onClick={() => {
                if (isOpen === "signup") handleFormType("login");
                else handleFormType("signup");
              }}
            >
              {isOpen === "signup" ? "Log In" : "Sign Up"}
            </span>
          </h2>
        </Form.Group>
      </Form>
    </>
  );
}

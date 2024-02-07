"use client";

import { openForm } from "@/app/redux/features/signupSlice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Signup from "../../../../actions/authRequests/signup";
import GoogleButton from "../GoogleButton/GoogleButton";
import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./LoginSignupForm.module.scss";

export default function LoginSignupForm() {
  // --- INPUT FIELDS --- //
  // Use state to toggle the type.
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // Changing the password show state on click.
  const handleToggle = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };

  // --- FORM TYPE --- //
  // Instantiate the state update event
  const dispatch = useDispatch<AppDispatch>();

  // Changing the form type.
  const handleFormType = (currentState: string) => {
    dispatch(openForm(currentState));
  };

  // Get current state of the form.
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);

  // --- FORM SUBMIT --- //
  // Submitting user.
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Test the signup function by just passing in
    // props.

    // Storing the target value in the form to a variable.
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      username: { value: string };
      password: { value: any };
    };

    // TODO: Refactor this code to consider the difference
    // between Login and Signup. Login will not need name and
    // username.

    let name: string = "";
    let username: string = "";
    if (target.name || target.username) {
      name = target.name.value;
      username = target.username.value;
    }

    const email = target.email.value;
    const password = target.password.value;

    // TODO: Refactor this so that we consider whether isOpen
    // is either login or signup.

    // Signing up the new user.
    try {
      console.log(email, password, username, name);
      const user = await Signup({ email, password, username, name } as User);

      await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/home",
      });
    } catch (error) {
      throw new Error("There was an error when signing up: " + error);
    }
  };

  return (
    <>
      <Form className={styles.formWrapper} onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className={styles.topContainer}>
          <Logo />
          <h1 className={styles.heading}>
            {isOpen === "signup" ? "Sign Up" : "Log In"}
          </h1>
          {/* Create a map that will render the input */}
          {isOpen === "signup" && (
            <>
              <Form.Control
                placeholder="FULLNAME"
                name="name"
                id={styles.inputWrapper}
              />
              <Form.Control
                placeholder="USERNAME"
                name="username"
                id={styles.inputWrapper}
              />
            </>
          )}
          <Form.Control
            placeholder="EMAIL"
            name="email"
            id={styles.inputWrapper}
          />
          <InputGroup id={styles.groupWrapper}>
            <Form.Control
              placeholder="PASSWORD"
              type={showPassword ? "password" : "text"}
              name="password"
              id={styles.inputWrapper}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => handleToggle()}
              className={styles.button}
            >
              {showPassword ? (
                <FaRegEyeSlash className={styles.eye} />
              ) : (
                <FaRegEye className={styles.eye} />
              )}
            </Button>
          </InputGroup>
        </Form.Group>
        {isOpen === "signup" ? (
          <LoginButtonSignUpButton buttonChoice="signup" />
        ) : (
          <LoginButtonSignUpButton buttonChoice="login" />
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

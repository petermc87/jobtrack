"use client";

import { openForm } from "@/app/redux/features/signupSlice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { NEW_USER } from "../../../../graphql/mutations";
import GoogleButton from "../GoogleButton/GoogleButton";
import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./LoginSignupForm.module.scss";

export default function LoginSignupForm() {
  // --- INPUT FIELDS --- //
  // Use state to toggle the type.
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // State for error message
  const [message, setMessage] = useState<string>("");

  // Changing the password show state on click.
  const handleToggle = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };

  const router = useRouter();

  // ---> APOLLO CLIENT <--- //
  const [newUser, { data, loading, error }] = useMutation(NEW_USER);

  // ---> FORM TYPE(Redux) <--- //
  // Instantiate the state update event
  const dispatch = useDispatch<AppDispatch>();

  // Changing the form type.
  const handleFormType = (currentState: string) => {
    dispatch(openForm(currentState));
  };

  // Get current state of the form.
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);

  // ---> FORM SUBMIT(GraphQL/Apollo/NextAuth) <--- //
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

    if (loading) console.log("loading...");
    if (error) console.error("Submission Error!: ", error);

    // TODO: Make this a helper function. The event (e) that
    // gets passed into the handler function is either going
    // to be the demo button or the login details passed into the
    // input fields.
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
    // try {
    // ---> Sign Up User
    if (isOpen === "signup") {
      await newUser({
        variables: {
          name: name,
          username: username,
          email: email,
          password: password,
        },
      });
    } else if (isOpen === "login") {
      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      }).then(({ ok, status }: any) => {
        if (ok === true) {
          router.push("/home");
        } else {
          setMessage(status + ": Incorrect login credentials");
        }
      });
    } else {
      await signIn("credentials", {
        email: "test@mail.com",
        password: "12345",
        redirect: false,
      }).then(({ ok, status }: any) => {
        if (ok === true) {
          router.push("/home");
        } else {
          setMessage(status + "Incorrect login credentials");
        }
      });
    }
  };

  // Handling 'click outside' of the form to close it
  const formRef = useRef<HTMLFormElement>(null);

  // Calling the handle click outside.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        // Set the redux State for the form type here.
        handleFormType("");
      }
    }

    // Bind to an event listenter for closing modal
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className={styles.formBackground}>
      <div className={styles.closeButton}>
        <IoIosCloseCircleOutline />
      </div>
      <Form
        ref={formRef}
        className={styles.formWrapper}
        onSubmit={(e) => handleSubmit(e)}
      >
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
                className={styles.inputWrapper}
                required
              />
              <Form.Control
                placeholder="USERNAME"
                name="username"
                className={styles.inputWrapper}
              />
            </>
          )}
          {/* If its the demo button, then the value is set before
           anything is entered by the user.*/}
          {isOpen === "demo" ? (
            <Form.Control
              placeholder="EMAIL"
              name="email"
              className={styles.inputWrapper}
              required
              value={"test@mail.com"}
            />
          ) : (
            <Form.Control
              placeholder="EMAIL"
              name="email"
              className={styles.inputWrapper}
              required
            />
          )}
          <InputGroup id={styles.groupWrapper}>
            {isOpen === "demo" ? (
              <Form.Control
                placeholder="PASSWORD"
                type={showPassword ? "password" : "text"}
                name="password"
                className={styles.inputWrapper}
                required
                value={"12345"}
              />
            ) : (
              <Form.Control
                placeholder="PASSWORD"
                type={showPassword ? "password" : "text"}
                name="password"
                className={styles.inputWrapper}
                required
              />
            )}

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
        {message && <div className={styles.errorMessage}>{message}</div>}
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
          {/* Test account */}
        </Form.Group>
        <div className={styles.testContainer}>
          <h2>Sign in with our demo account:</h2>
          <LoginButtonSignUpButton buttonChoice="demo" />
        </div>
      </Form>
    </div>
  );
}

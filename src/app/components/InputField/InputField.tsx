"use client";

import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import styles from "./InputField.module.scss";

type InputTypes = {
  placeholderText: string;
};

export default function InputField({ placeholderText }: InputTypes) {
  // Use state to toggle the type.
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // Changing the state on click.
  const handleToggle = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };
  return (
    <>
      <InputGroup id={styles.groupWrapper}>
        <Form.Control
          aria-describedby="basic-addon2"
          // The two types for "PASSWORD" field are either
          // "password" or "text", otherwise, in the case of the
          // other fields, it is "text" only.
          type={
            showPassword && placeholderText === "PASSWORD"
              ? "password"
              : !showPassword && placeholderText === "PASSWORD"
              ? "text"
              : "text"
          }
          placeholder={placeholderText}
          id={styles.inputWrapper}
        />
        {/* Eye button beside input to toggle password visibility*/}
        {placeholderText === "PASSWORD" && (
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => handleToggle()}
            className={styles.button}
          >
            {/* If it is off(false), it is "text", and the opposite for "password" */}
            {showPassword ? (
              <FaRegEyeSlash className={styles.eye} />
            ) : (
              <FaRegEye className={styles.eye} />
            )}
          </Button>
        )}
      </InputGroup>
    </>
  );
}

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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Changing the state on click.
  const handleToggle = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  };
  return (
    <>
      <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={placeholderText}
          id={styles.inputWrapper}
        />
        {/* Eye button beside input to toggle pass visibility*/}
        {placeholderText === "PASSWORD" && (
          <Button onClick={() => handleToggle()}>
            {/* If it is off(false), it is "password", and the opposite for "text" */}
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </Button>
        )}
      </InputGroup>
    </>
  );
}

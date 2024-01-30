"use client";

import { Form } from "react-bootstrap";
import styles from "./InputField.module.scss";

type InputTypes = {
  placeholderText: string;
};

export default function InputField({ placeholderText }: InputTypes) {
  return (
    <Form.Control
      type="text"
      placeholder={placeholderText}
      id={styles.inputWrapper}
    />
  );
}

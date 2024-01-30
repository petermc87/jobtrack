"use client";

import { Form } from "react-bootstrap";

type InputTypes = {
  placeholderText: string;
};

export default function InputField({ placeholderText }: InputTypes) {
  return <Form.Control type="text" placeholder={placeholderText} />;
}

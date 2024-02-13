import { signIn } from "next-auth/react";
import { Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa6";
import styles from "./GoogleButton.module.scss";

export default function GoogleButton() {
  const handleOAuthSubmit = () => {
    signIn("google", {
      callbackUrl: "/home",
    });
  };

  return (
    <Container
      className={styles.googleWrapper}
      onClick={() => handleOAuthSubmit()}
    >
      <FaGoogle className={styles.icon} />
      <h1>Sign In with Google</h1>
    </Container>
  );
}

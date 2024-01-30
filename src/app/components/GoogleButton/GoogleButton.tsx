import { Container } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa6";
import styles from "./GoogleButton.module.scss";

export default function GoogleButton() {
  return (
    <Container className={styles.googleWrapper}>
      <h1>Sign In with Google</h1> <FaGoogle className={styles.icon} />
    </Container>
  );
}

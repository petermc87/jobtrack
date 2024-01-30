import { Container } from "react-bootstrap";
import styles from "./JobListElement.module.scss";

export default function JobListElement() {
  return (
    <>
      <Container className={styles.formWrapper}>
        <Container className={styles.topContainer}>
          <Container className={styles.left}>LEFT</Container>
          <Container className={styles.right}>RIGHT</Container>
        </Container>
        <Container className={styles.bottomContainer}>
          <Container className={styles.left}>LEFT</Container>
          <Container className={styles.right}>RIGHT</Container>
        </Container>
      </Container>
    </>
  );
}

import { Button } from "react-bootstrap";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <Button id={styles.loginButtonEl}>This Button</Button>
      <h1>Hello</h1>
      <h2>Hello</h2>
      <p>Hello</p>
    </div>
  );
}

import { Button } from "react-bootstrap";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <Button id={styles.loginButtonEl}>This Button</Button>
    </div>
  );
}

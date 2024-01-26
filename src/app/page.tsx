import { Button } from "react-bootstrap";

import Logo from "./components/Logo/logo";
import TitleText from "./components/TitleText/TitleText";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div>
      <Button id={styles.loginButtonEl}>This Button</Button>
      <Logo />
      <TitleText text="An easy way to track your job applications" />
      <h1>Hello</h1>
      <h2>Hello</h2>
      <p>Hello</p>
    </div>
  );
}

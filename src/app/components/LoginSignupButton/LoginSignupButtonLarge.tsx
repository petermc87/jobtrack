import { Button } from "react-bootstrap";
import styles from "./LoginSignupButtonLarge.module.scss";

type LoginSignupLargeTypes<ReactNode> = {
  buttonChoice: ReactNode;
};

export default function LoginSignupLarge({
  buttonChoice,
}: LoginSignupLargeTypes<boolean>) {
  return (
    <Button id={styles.loginButtonEl}>
      {buttonChoice ? "Log In" : "Sign Up"}
    </Button>
  );
}

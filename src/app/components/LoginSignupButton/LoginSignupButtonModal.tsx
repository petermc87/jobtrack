import { Button } from "react-bootstrap";
import styles from "./LoginSignupButtonModal.module.scss";

// IMPORTANT: ex. of error TS2315 correction. Because this is a react-bootstrap
// component, we have to declare the type as a var <ReactNode>, then pass it
// to buttonChoice props. This then gets desctructured into the
// actual prop type ButtonTypes<boolean> being passed into the return function.
type ButtonTypes<ReactNode> = {
  buttonChoice: ReactNode;
};

export default function LoginButtonSignUpButton({
  buttonChoice,
}: ButtonTypes<boolean>) {
  return (
    <Button id={styles.loginButtonEl}>
      {buttonChoice ? "Log In" : "Sign Up"}
    </Button>
  );
}

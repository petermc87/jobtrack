import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <div className={styles.NavWrapper}>
      <Logo />
      <div className={styles.buttonContainer}>
        <LoginButtonSignUpButton buttonChoice="signup" />
        <LoginButtonSignUpButton buttonChoice="login" />
      </div>
    </div>
  );
}

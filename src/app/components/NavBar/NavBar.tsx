import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <div className={styles.NavWrapper}>
      <Logo />
      <LoginButtonSignUpButton buttonChoice="signup" />
    </div>
  );
}

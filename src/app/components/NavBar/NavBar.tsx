import { useSession } from "next-auth/react";
import LoginButtonSignUpButton from "../LoginSignupButton/LoginSignupButtonModal";
import Logo from "../Logo/logo";
import styles from "./NavBar.module.scss";
export default function NavBar() {
  // Retrieve data to check if its login/signup or logout.
  const { data } = useSession();

  return (
    <div className={styles.NavWrapper} id={styles.desktop}>
      <Logo />

      {/* IMPORTANT: Render a login and signup button, otherwise just one  */}
      {/* logout. To do this, check the session data. */}

      {/* <div className={styles.desktop}> */}
      {/* TODO: Add in a ternary to check the difference between desktop */}
      {/* and mobile. */}
      {!data ? (
        <div className={styles.buttonContainer}>
          <LoginButtonSignUpButton buttonChoice="signup" />
          <LoginButtonSignUpButton buttonChoice="login" />
        </div>
      ) : (
        <div className={styles.buttonContainer} id={styles.logout}>
          <LoginButtonSignUpButton buttonChoice="logout" />
        </div>
      )}
    </div>
    // </div>
  );
}

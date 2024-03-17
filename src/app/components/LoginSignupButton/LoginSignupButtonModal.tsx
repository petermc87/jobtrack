import { openForm } from "@/app/redux/features/signupSlice";
import { AppDispatch } from "@/app/redux/store";
import { signOut, useSession } from "next-auth/react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
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
}: ButtonTypes<string>) {
  // If there is a user, then that will affect the button type also.
  const { data } = useSession();

  // Setting redux state
  const dispatch = useDispatch<AppDispatch>();

  // Setting the login form
  const handleOpenLogin = (currentState: string) => {
    dispatch(openForm(currentState));
  };

  return (
    <>
      {/* No data --> either Sign Up OR Log In */}
      {!data ? (
        <Button
          type="submit"
          id={styles.loginButtonEl}
          onClick={() => {
            if (buttonChoice === "login") handleOpenLogin("login");
            else if (buttonChoice === "signup") handleOpenLogin("signup");
            else handleOpenLogin("demo");
          }}
        >
          {/* Add in third button choice (i.e. test login) */}
          {buttonChoice === "login"
            ? "Log In"
            : buttonChoice === "signup"
            ? "Sign Up"
            : "Demo"}
        </Button>
      ) : (
        // data --> Log out
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          id={styles.loginButtonEl}
        >
          Log Out
        </Button>
      )}
    </>
  );
}

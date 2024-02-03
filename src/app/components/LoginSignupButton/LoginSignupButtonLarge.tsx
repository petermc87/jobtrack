import { openForm } from "@/app/redux/features/signupSlice";
import { AppDispatch } from "@/app/redux/store";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./LoginSignupButtonLarge.module.scss";

// Button choice types.
type LoginSignupLargeTypes<ReactNode> = {
  buttonChoice: ReactNode;
};

export default function LoginSignupLarge({
  buttonChoice,
}: LoginSignupLargeTypes<string>) {
  // Declaring the dispatch i.e. setting redux state.
  // Importing types declared in store.ts
  const dispatch = useDispatch<AppDispatch>();

  // Setting the login form
  const handleOpenLogin = (currentState: string) => {
    dispatch(openForm(currentState));
  };

  return (
    <Button
      id={styles.loginButtonEl}
      onClick={() => {
        if (buttonChoice === "login") handleOpenLogin("login");
        else handleOpenLogin("signup");
      }}
    >
      {buttonChoice === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}

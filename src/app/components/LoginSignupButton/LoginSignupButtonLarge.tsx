import { openForm } from "@/app/redux/features/signupSlice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./LoginSignupButtonLarge.module.scss";

type LoginSignupLargeTypes<ReactNode> = {
  buttonChoice: ReactNode;
};

export default function LoginSignupLarge({
  buttonChoice,
}: LoginSignupLargeTypes<string>) {
  // Declaring the dispatch i.e. setting redux state.
  // Importing types declared in store.ts
  const dispatch = useDispatch<AppDispatch>();

  // Get current state of the form.
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);

  // Setting the login form
  const handleOpenLogin = (currentState: string) => {
    dispatch(openForm(currentState));
  };

  // Settings
  return (
    <Button
      id={styles.loginButtonEl}
      onClick={() => {
        // If there is an empty field, or if its 'login',
        // make it 'signup', otherwise make it '' to
        // close the form.
        if (isOpen === "") handleOpenLogin("signup");
        else handleOpenLogin("");
      }}
    >
      {buttonChoice === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}

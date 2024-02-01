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
}: LoginSignupLargeTypes<boolean>) {
  // Declaring the dispatch i.e. setting redux state.
  // Importing types declared in store.ts
  const dispatch = useDispatch<AppDispatch>();

  // Get current state of the form.
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);

  // Setting the login form
  const handleOpenLogin = (currentState: boolean) => {
    dispatch(openForm(currentState));
  };

  // Settings
  return (
    <Button
      id={styles.loginButtonEl}
      onClick={() => {
        if (isOpen === false) handleOpenLogin(true);
        else handleOpenLogin(false);
      }}
    >
      {buttonChoice ? "Log In" : "Sign Up"}
    </Button>
  );
}

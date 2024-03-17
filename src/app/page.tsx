"use client";

import Footer from "./components/Footer/Footer";
import LoginSignupLarge from "./components/LoginSignupButton/LoginSignupButtonLarge";
import LoginSignupForm from "./components/LoginSignupForm/LoginSignupForm";
import NavBar from "./components/NavBar/NavBar";
import TitleText from "./components/TitleText/TitleText";
import styles from "./page.module.scss";
// Import redux variables.

import { useAppSelector } from "./redux/store";

export default function Home() {
  // Retrieving the value stored elsewhere i.e when the a button is selected
  // at the NavBar.
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);

  return (
    <div>
      <NavBar />
      {isOpen === "signup" || isOpen === "login" || isOpen === "demo" ? (
        <LoginSignupForm />
      ) : (
        ""
      )}
      <div className={styles.landingWrapper}>
        <TitleText
          text="An easy way to track your job applications"
          style={{}}
        />
        <br />
        <br />

        <LoginSignupLarge buttonChoice="signup" />
      </div>
      <Footer />
    </div>
  );
}

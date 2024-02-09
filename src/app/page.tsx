"use client";

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
      {isOpen === "signup" || isOpen === "login" ? <LoginSignupForm /> : ""}
      <div className={styles.landingWrapper}>
        <TitleText
          text="An easy way to track your job applications"
          style={{}}
        />
        <LoginSignupLarge buttonChoice="signup" />
        <LoginSignupLarge buttonChoice="login" />
        {/* <p>Current state: {isOpen.toString()}</p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <p>Paragraph</p>
        <br />
        <br />
        <br />

        <LoginSignupLarge buttonChoice="signup" />
        <LoginSignupLarge buttonChoice="login" />
        <ExpandSmall buttonChoice={true} />
        <ExpandSmall buttonChoice={false} />
        <ExpandLarge buttonChoice={true} />
        <ExpandLarge buttonChoice={false} />
        <AddButton />

        <RadioButton buttonChoice={true} />
        <RadioButton buttonChoice={false} />
        <ResumeUpload />
        <br />
        <br />
        <JobListElement />

        <br />
        <br />
        <br />
        <GoogleButton />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" /> */}
      </div>
    </div>
  );
}

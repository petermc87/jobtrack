"use client";

import AddButton from "./components/AddButton/AddButton";
import ExpandLarge from "./components/ExpandButtons/ExpandButtonLarge";
import ExpandSmall from "./components/ExpandButtons/ExpandButtonSmall";
import GoogleButton from "./components/GoogleButton/GoogleButton";
import InputField from "./components/InputField/InputField";
import JobListElement from "./components/JobListElement/JobListElement";
import LoginSignupLarge from "./components/LoginSignupButton/LoginSignupButtonLarge";
import LoginSignupForm from "./components/LoginSignupForm/LoginSignupForm";
import NavBar from "./components/NavBar/NavBar";
import RadioButton from "./components/RadioButton/RadioButton";
import ResumeUpload from "./components/ResumeUploadButton/ResumeUploadButton";
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

      <div className={styles.landingWrapper}>
        <TitleText text="An easy way to track your job applications" />
        <p>Current state: {isOpen.toString()}</p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <p>Paragraph</p>
        <LoginSignupLarge buttonChoice={false} />
        <ExpandSmall buttonChoice={true} />
        <ExpandSmall buttonChoice={false} />
        <ExpandLarge buttonChoice={true} />
        <ExpandLarge buttonChoice={false} />
        <AddButton />

        <RadioButton buttonChoice={true} />
        <RadioButton buttonChoice={false} />
        <ResumeUpload />
        <InputField placeholderText="e.g Construction, Real Estate..." />
        <br />
        <br />
        <JobListElement />
        <br />
        <br />
        <br />
        <LoginSignupForm />
        <br />
        <br />
        <br />
        <GoogleButton />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
        <TitleText text="An easy way to track your job applications" />
      </div>
    </div>
  );
}

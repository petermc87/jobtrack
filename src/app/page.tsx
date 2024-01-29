import AddButton from "./components/AddButton/AddButton";
import ExpandLarge from "./components/ExpandButtons/ExpandButtonLarge";
import ExpandSmall from "./components/ExpandButtons/ExpandButtonSmall";
import LoginSignupLarge from "./components/LoginSignupButton/LoginSignupButtonLarge";
import NavBar from "./components/NavBar/NavBar";
import RadioButton from "./components/RadioButton/RadioButton";
import ResumeUpload from "./components/ResumeUploadButton/ResumeUploadButton";
import TitleText from "./components/TitleText/TitleText";
import styles from "./page.module.scss";
export default function Home() {
  return (
    <div>
      <NavBar />
      <div className={styles.landingWrapper}>
        <TitleText text="An easy way to track your job applications" />

        <LoginSignupLarge buttonChoice={false} />
        <ExpandSmall buttonChoice={true} />
        <ExpandSmall buttonChoice={false} />
        <ExpandLarge buttonChoice={true} />
        <ExpandLarge buttonChoice={false} />
        <AddButton />

        <RadioButton buttonChoice={true} />
        <RadioButton buttonChoice={false} />
        <ResumeUpload />
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

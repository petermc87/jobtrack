import LoginSignupLarge from "./components/LoginSignupButton/LoginSignupButtonLarge";
import LoginButtonSignUpButton from "./components/LoginSignupButton/LoginSignupButtonModal";
import Logo from "./components/Logo/logo";
import TitleText from "./components/TitleText/TitleText";

export default function Home() {
  return (
    <div>
      <LoginButtonSignUpButton buttonChoice={true} />
      <LoginSignupLarge buttonChoice={false} />
      <Logo />
      <TitleText text="An easy way to track your job applications" />
      <h1>Hello</h1>
      <h2>Hello</h2>
      <p>Hello</p>
    </div>
  );
}

import LoginButtonSignUpButton from "./components/LoginSignupButton/LoginSignupButton";
import Logo from "./components/Logo/logo";
import TitleText from "./components/TitleText/TitleText";

export default function Home() {
  return (
    <div>
      <LoginButtonSignUpButton buttonChoice={false} />
      <Logo />
      <TitleText text="An easy way to track your job applications" />
      <h1>Hello</h1>
      <h2>Hello</h2>
      <p>Hello</p>
    </div>
  );
}

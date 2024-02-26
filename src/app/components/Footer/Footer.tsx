import { useRouter } from "next/navigation";
import Logo from "../Logo/logo";
import styles from "./Footer.module.scss";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className={styles.footerWrapper}>
        <br />
        {/* <br /> */}
        <Logo />
        <h2>
          Made with &#10084; by Peter McGibney. Check out the github repo{" "}
          <span
            onClick={() => router.push("https://github.com/petermc87/jobtrack")}
          >
            here
          </span>
        </h2>
      </div>
    </>
  );
}

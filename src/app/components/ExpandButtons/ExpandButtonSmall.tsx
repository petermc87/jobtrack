import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import styles from "./ExpandButtonSmall.module.scss";

type buttonTypes = {
  buttonChoice: boolean;
};

// Use a boolean to manage whether its an Up or Down arrow.
export default function ExpandSmall({ buttonChoice }: buttonTypes) {
  return (
    <>
      {buttonChoice ? (
        <IoChevronDownCircleOutline id={styles.buttonWrapper} />
      ) : (
        <IoChevronUpCircleOutline id={styles.buttonWrapper} />
      )}
    </>
  );
}

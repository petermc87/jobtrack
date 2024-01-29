import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { ButtonTypes } from "../../../../typings";
import styles from "./ExpandButtonSmall.module.scss";

// Use a boolean to manage whether its an Up or Down arrow.
export default function ExpandSmall({ buttonChoice }: ButtonTypes) {
  return (
    <>
      {buttonChoice ? (
        <IoChevronDownCircleOutline className={styles.buttonWrapper} />
      ) : (
        <IoChevronUpCircleOutline className={styles.buttonWrapper} />
      )}
    </>
  );
}

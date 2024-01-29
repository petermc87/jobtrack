import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import { ButtonTypes } from "../../../../typings";
import styles from "./ExpandButtonLarge.module.scss";

export default function ExpandLarge({ buttonChoice }: ButtonTypes) {
  return (
    <>
      {buttonChoice ? (
        <FaCircleChevronDown className={styles.buttonWrapper} />
      ) : (
        <FaCircleChevronUp className={styles.buttonWrapper} />
      )}
    </>
  );
}

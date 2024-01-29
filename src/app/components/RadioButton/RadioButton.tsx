import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { ButtonTypes } from "../../../../typings";
import styles from "./RadioButton.module.scss";

export default function RadioButton({ buttonChoice }: ButtonTypes) {
  return (
    <>
      {buttonChoice ? (
        <MdOutlineRadioButtonChecked className={styles.buttonWrapper} />
      ) : (
        <MdOutlineRadioButtonUnchecked className={styles.buttonWrapper} />
      )}
    </>
  );
}

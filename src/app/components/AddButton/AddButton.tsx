import { IoIosAddCircle } from "react-icons/io";
import styles from "./AddButton.module.scss";

export default function AddButton() {
  return (
    <>
      <IoIosAddCircle className={styles.buttonWrapper} type="submit" />
    </>
  );
}

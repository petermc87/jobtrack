import { IoIosAddCircleOutline } from "react-icons/io";
import styles from "./AddButton.module.scss";

export default function AddButton() {
  return (
    <>
      <IoIosAddCircleOutline className={styles.buttonWrapper} />
    </>
  );
}

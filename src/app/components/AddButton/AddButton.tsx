import { Button } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import styles from "./AddButton.module.scss";

export default function AddButton() {
  return (
    <Button type="submit" className={styles.buttonWrapper}>
      <IoIosAddCircle className={styles.addButton} />
    </Button>
  );
}

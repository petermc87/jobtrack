import AddButton from "../AddButton/AddButton";
import styles from "./AddJobButton.module.scss";
export default function AddJobButton() {
  return (
    <div
      className={styles.addJobWrapper}
      onClick={() => "add the function here."}
    >
      <h2>Add a new job</h2>
      <AddButton />
    </div>
  );
}

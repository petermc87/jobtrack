import AddButton from "../AddButton/AddButton";
import styles from "./AddJobButton.module.scss";

type AddjobTypes = {
  handleSubmitJob: (e: any) => void;
};

export default function AddJobButton({ handleSubmitJob }: AddjobTypes) {
  // Pass in the function.
  return (
    <div className={styles.addJobWrapper} onClick={(e) => handleSubmitJob(e)}>
      <h2>Add a new job</h2>
      <AddButton />
    </div>
  );
}

import { Job } from "@prisma/client";
import RadioButton from "../RadioButton/RadioButton";
import styles from "./StatusSelector.module.scss";

type SelectorTypes = {
  job: Job;
  item: string;
  handleUpdate: (e: any, passedType: string, editedValue: string) => void;
};

export default function StatusSelector({
  job,
  item,
  handleUpdate,
}: SelectorTypes) {
  // Pass down job, handleUpate and item.
  return (
    <div
      className={styles.radioPair}
      onClick={(e) => {
        handleUpdate(e, "status", item.toLowerCase());
      }}
    >
      {/* Button selection will check if the current job status is equal to the */}
      {/* mapped item */}
      <RadioButton
        buttonChoice={job.status === item.toLocaleLowerCase() ? true : false}
      />
      <p>{item}</p>
    </div>
  );
}

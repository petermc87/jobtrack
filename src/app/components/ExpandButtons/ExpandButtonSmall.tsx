import { Dispatch, SetStateAction } from "react";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import styles from "./ExpandButtonSmall.module.scss";

type JobElementButtonTypes = {
  setCurrentJobId: Dispatch<SetStateAction<string>>;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
  buttonChoice: boolean;
  jobId: string;
};

// Use a boolean to manage whether its an Up or Down arrow.
export default function ExpandSmall({
  buttonChoice,
  jobId,
  setCurrentJobId,
  setShowDetails,
}: JobElementButtonTypes) {
  return (
    <>
      {buttonChoice ? (
        <IoChevronUpCircleOutline
          className={styles.buttonWrapper}
          onClick={() => setShowDetails(false)}
        />
      ) : (
        // show details true and set the currentJobId to show the expanded job list element.
        <IoChevronDownCircleOutline
          className={styles.buttonWrapper}
          onClick={() => {
            setShowDetails(true);
            setCurrentJobId(jobId);
          }}
        />
      )}
    </>
  );
}

import { Dispatch, SetStateAction } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import styles from "./ExpandButtonLarge.module.scss";

type ExpandButtonTypes = {
  showJobs: boolean;
  setShowJobs: Dispatch<SetStateAction<boolean>>;
  setCurrentSelected: Dispatch<SetStateAction<number>>;
  currentSelected: number;
  i: number;
};

export default function ExpandLarge({
  showJobs,
  setShowJobs,
  setCurrentSelected,
  currentSelected,
  i,
}: ExpandButtonTypes) {
  // Function on click.
  const handleSelectButton = () => {
    if (showJobs) {
      setShowJobs(false);
    } else {
      setShowJobs(true);
    }
    setCurrentSelected(i);
  };
  return (
    <>
      {/* IF THE JOBS ARE NOT BEING SHOWN, AND IT IS CONCERNING THE CURRENT SELECTED CAT ONLY */}
      {!showJobs && currentSelected === i ? (
        <FaCircleChevronDown
          className={styles.buttonWrapper}
          onClick={() => handleSelectButton()}
        />
      ) : // IF THE JOBS ARE BEING SHOWN, AND IT IS CONCERNING THE CURRENT SELECTED CAT ONLY
      showJobs && currentSelected === i ? (
        <FaCircleChevronUp
          className={styles.buttonWrapper}
          onClick={() => handleSelectButton()}
        />
      ) : (
        <FaCircleChevronDown
          className={styles.buttonWrapper}
          onClick={() => handleSelectButton()}
        />
      )}
    </>
  );
}

import { Dispatch, SetStateAction } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import styles from "./ExpandButtonLarge.module.scss";

type ExpandButtonTypes = {
  showJobs: boolean;
  setShowJobs: Dispatch<SetStateAction<boolean>>;
  // Current category object being passed down.
  setCurrentCategoryId: Dispatch<SetStateAction<string>>;
  currentCategoryId: string;
  // Category id of the current iteration
  iteratedCategoryId: string;
};

export default function ExpandLarge({
  showJobs,
  setShowJobs,
  //CatrgoryId Selection
  currentCategoryId,
  setCurrentCategoryId,
  iteratedCategoryId,
}: ExpandButtonTypes) {
  // Show the jobs or hide and store the current iteration of cat id in state for use elsewhere.
  const handleSelectButton = () => {
    if (showJobs) {
      setShowJobs(false);
    } else {
      setShowJobs(true);
    }
    setCurrentCategoryId(iteratedCategoryId);
  };
  return (
    <>
      {/* IF THE JOBS ARE NOT BEING SHOWN, AND IT IS CONCERNING THE CURRENT SELECTED CAT ONLY */}
      {!showJobs && currentCategoryId === iteratedCategoryId ? (
        <FaCircleChevronDown
          className={styles.buttonWrapper}
          onClick={() => handleSelectButton()}
        />
      ) : // IF THE JOBS ARE BEING SHOWN, AND IT IS CONCERNING THE CURRENT SELECTED CAT ONLY
      showJobs && currentCategoryId === iteratedCategoryId ? (
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

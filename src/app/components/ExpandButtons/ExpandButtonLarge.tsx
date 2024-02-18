import { Dispatch, SetStateAction } from "react";
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import styles from "./ExpandButtonLarge.module.scss";

// type CategoryTypeDestructure = {
//   id: string;
//   name: String;
//   userId: String;
// };

type ExpandButtonTypes = {
  showJobs: boolean;
  setShowJobs: Dispatch<SetStateAction<boolean>>;
  // category: CategoryTypeDestructure;
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
}: // category,
ExpandButtonTypes) {
  return (
    <>
      {/* IF THE JOBS ARE NOT BEING SHOWN, AND IT IS CONCERNING THE CURRENT SELECTED CAT ONLY */}
      {!showJobs && currentSelected === i ? (
        <FaCircleChevronDown
          className={styles.buttonWrapper}
          onClick={() => {
            console.log("Click");
            if (showJobs) {
              setShowJobs(false);
            } else {
              setShowJobs(true);
            }
            setCurrentSelected(i);
          }}
        />
      ) : // IF THE JOBS ARE BEING SHOWN, AND IT IS CONCERNING THE CURRENT SELECTED CAT ONLY
      showJobs && currentSelected === i ? (
        <FaCircleChevronUp
          className={styles.buttonWrapper}
          onClick={() => {
            if (showJobs) {
              setShowJobs(false);
            } else {
              setShowJobs(true);
            }
            setCurrentSelected(i);
          }}
        />
      ) : (
        <FaCircleChevronDown
          className={styles.buttonWrapper}
          onClick={() => {
            console.log("Click");
            if (showJobs) {
              setShowJobs(false);
            } else {
              setShowJobs(true);
            }
            setCurrentSelected(i);
          }}
        />
      )}
      {/* <Button
        onClick={() => {
          console.log("Click");
          if (showJobs) {
            setShowJobs(false);
          } else {
            setShowJobs(true);
          }
          setCurrentSelected(i);
        }}
      >
        Click Me
      </Button> */}
    </>
  );
}

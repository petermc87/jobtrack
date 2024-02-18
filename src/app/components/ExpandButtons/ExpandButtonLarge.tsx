import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
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
  i: number;
};

export default function ExpandLarge({
  showJobs,
  setShowJobs,
}: // category,
ExpandButtonTypes) {
  console.log(showJobs);
  return (
    <>
      {!showJobs ? (
        <FaCircleChevronDown className={styles.buttonWrapper} />
      ) : (
        <FaCircleChevronUp className={styles.buttonWrapper} />
      )}
      <Button
        onClick={() => {
          console.log("Click");
          if (showJobs) {
            setShowJobs(false);
          } else {
            setShowJobs(true);
          }
        }}
      >
        Click Me
      </Button>
    </>
  );
}

import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";

type DangerModalTypes = {
  show: boolean;
  handleDeleteCategory: (e: any, id: string) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
  currentCategoryId: string;
};

export default function DangerModal({
  show,
  setShow,
  handleDeleteCategory,
  currentCategoryId,
}: DangerModalTypes) {
  //Check items passed in.
  // Pass in the event to the function here to satisfy the delete method params.
  console.log(show, currentCategoryId);
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}></Modal>
    </>
  );
}

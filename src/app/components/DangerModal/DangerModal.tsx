import { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";

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
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        key={currentCategoryId}
      >
        <Modal.Header closeButton>
          <Modal.Title>Danger!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete this forever, are you sure you want to
          continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleDeleteCategory(e, currentCategoryId);
              setShow(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

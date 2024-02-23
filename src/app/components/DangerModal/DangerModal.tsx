import { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./DangerModal.module.scss";
type DangerModalTypes = {
  show: boolean;
  handleDelete: (e: any, id: string) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
  currentId: string;
};

export default function DangerModal({
  show,
  setShow,
  handleDelete,
  currentId,
}: DangerModalTypes) {
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        key={currentId}
        style={{ border: "0 !important" }}
      >
        <Modal.Header closeButton className={styles.modalWrapper}>
          <Modal.Title
            className={styles.title}
            style={{ border: "solid #494949" }}
          >
            Danger!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={styles.body}
          style={{
            color: "#11e0c0",
            backgroundColor: "#494949",
          }}
        >
          You are about to delete this forever, are you sure you want to
          continue?
        </Modal.Body>
        <Modal.Footer
          className={styles.footer}
          style={{ backgroundColor: "#494949" }}
        >
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleDelete(e, currentId);
              setShow(false);
            }}
            style={{
              backgroundColor: "#11e0c0",
              color: "#494949",
              border: "none",
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

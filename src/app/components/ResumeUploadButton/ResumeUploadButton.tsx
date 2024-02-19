import { Container } from "react-bootstrap";
import { GrDocumentUpload } from "react-icons/gr";
import { MdOutlineDownloadForOffline, MdPreview } from "react-icons/md";
import styles from "./ResumeUploadButton.module.scss";
export default function ResumeUpload() {
  return (
    <>
      <Container className={styles.buttonContainer}>
        {/* VIEW CONTAINER */}
        <Container className={styles.viewContainer}>
          <MdPreview className={styles.buttonWrapper} id={styles.eye} />
          <div className={styles.viewTextWrapper}>
            <p>
              resume_placeholderasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
            </p>
          </div>
        </Container>
        {/* BOTTOM BUTTON CONTAINER */}
        <Container className={styles.bottomContainer}>
          <GrDocumentUpload
            className={styles.buttonWrapper}
            id={styles.upload}
          />
          <MdOutlineDownloadForOffline className={styles.buttonWrapper} />
        </Container>
      </Container>
    </>
  );
}

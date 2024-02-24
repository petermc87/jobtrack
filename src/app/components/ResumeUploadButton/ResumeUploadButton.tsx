import { Job } from "@prisma/client";
import { Container } from "react-bootstrap";
import { MdPreview } from "react-icons/md";
import styles from "./ResumeUploadButton.module.scss";

type ResumeUploadTypes = {
  job: Job;
};

export default function ResumeUpload({ job }: ResumeUploadTypes) {
  return (
    <>
      <Container className={styles.buttonContainer}>
        {/* VIEW CONTAINER */}
        <Container className={styles.viewContainer}>
          <MdPreview className={styles.buttonWrapper} id={styles.eye} />
          <div className={styles.viewTextWrapper}>
            <p>{job.resumeLink}</p>
          </div>
        </Container>
      </Container>
    </>
  );
}

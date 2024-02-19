import { Job } from "@prisma/client";
import { Container } from "react-bootstrap";
import ExpandSmall from "../ExpandButtons/ExpandButtonSmall";
import RadioButton from "../RadioButton/RadioButton";
import ResumeUpload from "../ResumeUploadButton/ResumeUploadButton";
import styles from "./JobListElement.module.scss";
// NOTE: Using regular divs here to avoid having to
// change styling for a react-bootstrap container.
type JobTypes = {
  job: Job;
};

export default function JobListElement({ job }: JobTypes) {
  return (
    // Mutation function for updating the status of the job.

    <>
      <Container className={styles.formWrapper}>
        {/* TOP HALF (ABOVE THE BLUE LINE) */}
        <div className={styles.topContainer}>
          <div className={styles.left}>
            <h2>Title</h2>
            <p className={styles.editText}>{job.title}</p>
          </div>
          <div className={styles.right}>
            <h2>Link</h2>
            <p className={styles.editText}>https://examplelink</p>
          </div>
        </div>
        {/* BOTTOM HALF (BELOW BLUE DIVIDER) */}
        <div className={styles.bottomContainer}>
          {/* TOP ROW */}
          <div className={styles.topRow}>
            <div className={styles.left}>
              <h2>Status</h2>
              <div className={styles.radioContainer}>
                {/* On click will call the useMutation function for updating the job. */}

                <div className={styles.radioPair}>
                  <RadioButton
                    buttonChoice={job.status === "added" ? true : false}
                  />{" "}
                  <p>Added</p>
                </div>
                <div className={styles.radioPair}>
                  <RadioButton
                    buttonChoice={job.status === "applied" ? true : false}
                  />{" "}
                  <p>Applied</p>
                </div>
                <div className={styles.radioPair}>
                  <RadioButton
                    buttonChoice={job.status === "accepted" ? true : false}
                  />{" "}
                  <p>Accepted</p>
                </div>
                <div className={styles.radioPair}>
                  <RadioButton
                    buttonChoice={job.status === "rejected" ? true : false}
                  />{" "}
                  <p>Rejected</p>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <h2>Job Summary</h2>
              <div className={styles.summaryPoints}>
                <ul>
                  <li>
                    <p>Here is a point.</p>
                  </li>
                  <li>
                    <p>Here is a point.</p>
                  </li>
                  <li>
                    <p>Here is a point.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className={styles.bottomRow}>
            <h2>Resume</h2>
            <div className={styles.right} id={styles.resumeUpload}>
              <ResumeUpload />
            </div>
            <ExpandSmall buttonChoice={false} />
          </div>
        </div>
      </Container>
    </>
  );
}

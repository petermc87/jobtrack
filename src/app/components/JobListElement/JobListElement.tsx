import { useMutation } from "@apollo/client";
import { Job } from "@prisma/client";
import { Container } from "react-bootstrap";
import { UPDATE_JOB } from "../../../../graphql/mutations";
import { GET_USER } from "../../../../graphql/queries";
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
  // UpdateJob Mutation
  const [updateJob, { loading, error }] = useMutation(UPDATE_JOB, {
    refetchQueries: [GET_USER, "GetUser"],
  });
  // Mutation function for updating the status of the job.
  const handleUpdateStatus = (status: string) => {
    // Error handling
    if (loading) return <p>Updating...</p>;
    if (error) return <p>Update Error: {error.message}</p>;

    // Call update resolver function.
    updateJob({
      variables: { updateJobId: job.id, newValue: status, type: "status" },
    });
  };
  return (
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
                <div
                  className={styles.radioPair}
                  onClick={() => handleUpdateStatus("added")}
                >
                  <RadioButton
                    buttonChoice={job.status === "added" ? true : false}
                  />{" "}
                  <p>Added</p>
                </div>
                <div
                  className={styles.radioPair}
                  onClick={() => handleUpdateStatus("applied")}
                >
                  <RadioButton
                    buttonChoice={job.status === "applied" ? true : false}
                  />{" "}
                  <p>Applied</p>
                </div>
                <div
                  className={styles.radioPair}
                  onClick={() => handleUpdateStatus("accepted")}
                >
                  <RadioButton
                    buttonChoice={job.status === "accepted" ? true : false}
                  />{" "}
                  <p>Accepted</p>
                </div>
                <div
                  className={styles.radioPair}
                  onClick={() => handleUpdateStatus("rejected")}
                >
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

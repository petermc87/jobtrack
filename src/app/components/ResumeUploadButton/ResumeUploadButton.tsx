import { Job } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { MdPreview } from "react-icons/md";
import styles from "./ResumeUploadButton.module.scss";

type ResumeUploadTypes = {
  job: Job;
  handleUpdate: (e: any, passedType: string, editedValue: string) => void;
  currentJob: Job | null;
  setCurrentJob: Dispatch<SetStateAction<Job | null>>;
};

export default function ResumeUpload({
  job,
  handleUpdate,
  currentJob,
  setCurrentJob,
}: ResumeUploadTypes) {
  // Edit link state
  const [editLink, setEditLink] = useState(false);

  return (
    <>
      <Container className={styles.buttonContainer}>
        {/* VIEW CONTAINER */}
        <Container className={styles.viewContainer}>
          <MdPreview className={styles.buttonWrapper} id={styles.eye} />
          <div
            className={styles.viewTextWrapper}
            onClick={() => {
              setEditLink(true);
              setCurrentJob(job);
            }}
          >
            {!editLink ? (
              <p>{job.resumeLink}</p>
            ) : (
              <Form
                onSubmit={(e) => {
                  if (currentJob)
                    handleUpdate(e, "resumeLink", currentJob.resumeLink);
                  setEditLink(false);
                }}
              >
                <Form.Group typeof="submit">
                  <Form.Control
                    value={currentJob ? currentJob.resumeLink : ""}
                    onChange={(e) => {
                      if (currentJob)
                        setCurrentJob({
                          ...currentJob,
                          resumeLink: e.target.value,
                        });
                    }}
                  />
                </Form.Group>
              </Form>
            )}
          </div>
        </Container>
      </Container>
    </>
  );
}

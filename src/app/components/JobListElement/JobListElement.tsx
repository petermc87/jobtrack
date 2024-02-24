import { useMutation } from "@apollo/client";
import { Job } from "@prisma/client";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { DELETE_JOB, UPDATE_JOB } from "../../../../graphql/mutations";
import { GET_USER } from "../../../../graphql/queries";
import DangerModal from "../DangerModal/DangerModal";
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
  // Title input container state.
  const [editTitle, setEditTitle] = useState(false);

  // Current job
  const [currentJob, setCurrentJob] = useState<Job | null>(null);

  // Link input container state.
  const [editLink, setEditLink] = useState(false);

  // Job details show
  const [showJobDetails, setShowJobDetails] = useState(false);

  // Current selected job id.
  const [currentJobId, setCurrentJobId] = useState("");

  // Show danger modal
  const [showModal, setShowModal] = useState(false);

  // UpdateJob Mutation
  const [updateJob, { loading, error }] = useMutation(UPDATE_JOB, {
    refetchQueries: [GET_USER, "GetUser"],
  });

  // DeleteJob Mutation
  const [deleteJob] = useMutation(DELETE_JOB, {
    refetchQueries: [GET_USER, "GetUser"],
  });

  // Update with the key type, which is "status", "title", etc. The editedValue is
  // the new string entered into the input field.
  const handleUpdate = (e: any, passedType: string, editedValue: string) => {
    e.preventDefault();
    // if (currentJob) console.log(passedType, currentJob.title);
    if (loading) return <p>Updating...</p>;
    if (error) return <p>Update Error: {error.message}</p>;

    updateJob({
      variables: {
        updateJobId: job.id,
        newValue: editedValue,
        type: passedType,
      },
    });
  };

  // Delete job handler function.
  const handleDelete = (e: any, id: string) => {
    e.preventDefault();

    deleteJob({
      variables: {
        deleteJobId: id,
      },
    });
  };
  // Array of status types.
  const status = ["Added", "Applied", "Accepted", "Rejected"];
  return (
    <>
      <Container className={styles.formWrapper}>
        {/* TOP HALF (ABOVE THE BLUE LINE) */}
        <div className={styles.topContainer}>
          <div className={styles.titleAndLinkWrapper}>
            <div className={styles.left}>
              <h2>Title</h2>
              {!editTitle ? (
                <p
                  className={styles.editText}
                  onClick={() => {
                    setEditTitle(true);
                    setCurrentJob(job);
                  }}
                >
                  {job.title}
                </p>
              ) : (
                <>
                  {/* EDIT TITLE IN PLACE */}
                  <Form
                    onSubmit={(e) => {
                      setEditTitle(false);
                      if (currentJob)
                        handleUpdate(e, "title", currentJob.title);
                    }}
                  >
                    {/* In lieu of a submit button, we establish the submission of the */}
                    {/* input field as a self submitting. */}
                    <Form.Group typeof="submit">
                      <Form.Control
                        // For type error (undefined), we need to check if the currentjob
                        // has been retrieved from the backend before passing it.
                        value={currentJob ? currentJob.title : ""}
                        onChange={(e) => {
                          if (currentJob) {
                            setCurrentJob({
                              ...currentJob,
                              title: e.target.value,
                            });
                          }
                        }}
                      />
                    </Form.Group>
                  </Form>
                </>
              )}
            </div>
            <div className={styles.right}>
              <h2>Link</h2>
              {!editLink ? (
                <p
                  className={styles.editText}
                  onClick={() => {
                    setEditLink(true);
                    setCurrentJob(job);
                  }}
                >
                  {job.link}
                </p>
              ) : (
                <Form
                  onSubmit={(e) => {
                    setEditLink(false);
                    if (currentJob) handleUpdate(e, "link", currentJob.link);
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      value={currentJob ? currentJob.link : ""}
                      onChange={(e) => {
                        if (currentJob) {
                          setCurrentJob({
                            ...currentJob,
                            link: e.target.value,
                          });
                        }
                      }}
                      typeof="submit"
                    />
                  </Form.Group>
                </Form>
              )}
            </div>
            <div className={styles.deleteButton}>
              <RiDeleteBin7Fill
                onClick={() => {
                  setCurrentJobId(job.id);
                  setShowModal(true);
                }}
              />
            </div>
          </div>

          {/* DOWN CHEVRON WHEN NOT SHOWING EXPANDED DETAILS*/}

          {!showJobDetails && (
            <div className={styles.downArrowWrapper}>
              <ExpandSmall
                buttonChoice={showJobDetails}
                setCurrentJobId={setCurrentJobId}
                jobId={job.id}
                setShowDetails={setShowJobDetails}
              />
            </div>
          )}
        </div>

        {/* NOTE: This half will only be shown when the detail show state is true. */}

        {/* BOTTOM HALF (BELOW BLUE DIVIDER) */}
        {/* Comparison between job.id and currentJobId to only expand the current selection.*/}
        {showJobDetails && job.id === currentJobId && (
          <div className={styles.bottomContainer}>
            {/* TOP ROW */}
            <div className={styles.topRow}>
              <div className={styles.left}>
                <h2>Status</h2>
                <div className={styles.radioContainer}>
                  {/* On click will call the useMutation function for updating the job. */}
                  {status.map((item: string) => {
                    return (
                      <>
                        <div
                          className={styles.radioPair}
                          onClick={(e) =>
                            handleUpdate(e, "status", item.toLowerCase())
                          }
                        >
                          <RadioButton
                            buttonChoice={
                              job.status === item.toLowerCase() ? true : false
                            }
                          />{" "}
                          <p>{item}</p>
                        </div>
                      </>
                    );
                  })}
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
                <ResumeUpload
                  job={job}
                  handleUpdate={handleUpdate}
                  currentJob={currentJob}
                  setCurrentJob={setCurrentJob}
                />
              </div>
              <ExpandSmall
                buttonChoice={showJobDetails}
                setCurrentJobId={setCurrentJobId}
                jobId={job.id}
                setShowDetails={setShowJobDetails}
              />
            </div>
          </div>
        )}
      </Container>
      <DangerModal
        show={showModal}
        handleDelete={handleDelete}
        currentId={currentJobId}
        setShow={setShowModal}
      />
    </>
  );
}

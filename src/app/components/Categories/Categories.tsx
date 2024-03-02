import { Uuid } from "@/app/helpers/uuid";
import { useMutation, useQuery } from "@apollo/client";
import { Job, User } from "@prisma/client";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import {
  DELETE_CATEGORY,
  NEW_JOB,
  UPDATE_CATEGORY,
} from "../../../../graphql/mutations";
import { GET_USER } from "../../../../graphql/queries";
import AddJobButton from "../AddJobButton/AddJobButton";
import DangerModal from "../DangerModal/DangerModal";
import ExpandLarge from "../ExpandButtons/ExpandButtonLarge";
import JobListElement from "../JobListElement/JobListElement";
import styles from "./Categories.module.scss";

type UserTypes = {
  user: User | undefined;
};

type CategoryTypes = {
  id: any; // To resolve the Key types error in the categoryList return.
  name: String;
  userId: String;
  jobs: [Job];
};

export default function Categories({ user }: UserTypes) {
  // useQuery for user
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email: user?.email },
  });

  // Category Name State for Editing
  const [categoryName, setCategoryName] = useState<string>("");

  // Category name edit field
  const [edit, setEdit] = useState(false);

  // Show modal.
  const [showModal, setShowModal] = useState(false);

  // useMutation for new job
  const [newJob] = useMutation(NEW_JOB, {
    refetchQueries: [GET_USER, "GetUser"],
  });

  // useMutation for updating category
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [GET_USER, "GetUser"],
  });

  // useMutation for deleting category
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [GET_USER, "GetUser"],
  });
  // State for handling show jobs
  const [showJobs, setShowJobs] = useState(false);

  // Current category id.
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");

  if (loading) return null;
  if (error) return `Error: ${error}`;

  // Check if data and data.user exist
  if (!data || !data.user) return null;

  // Check if data.user.categories exist
  if (!data.user.categories) return <div>No categories found.</div>;

  // New job function
  const handleSubmitJob = (e: any) => {
    e.preventDefault();

    // Use the current selected category here.
    newJob({
      variables: {
        title: "enterNewJob",
        link: "enterNewJobLink.com",
        jobDescription: "enterNewJobDescription",
        //NOTE: We add the currentCategoryId based on the chevron selection
        // of a category.
        categoryId: currentCategoryId,
        resumeLink: "enterResumeLink.com",
        status: "added",
      },
    });
  };

  // Edit handler function
  const handleEditCategory = (e: any) => {
    e.preventDefault();

    updateCategory({
      variables: {
        updateCategoryId: currentCategoryId,
        newName: categoryName,
      },
    });
  };

  // Delete category
  const handleDeleteCategory = (e: any, id: string) => {
    e.preventDefault();

    deleteCategory({
      variables: {
        deleteCategoryId: id,
      },
    });
  };
  const categoriesList = data.user.categories.map((category: CategoryTypes) => {
    return (
      <div key={category.id} className={styles.allCategoriesWrapper}>
        <div className={styles.headingWrapper}>
          <div className={styles.leftElementsWrapper}>
            {edit && category.id === currentCategoryId ? (
              <>
                <Form
                  onSubmit={(e) => {
                    setEdit(false);
                    handleEditCategory(e);
                  }}
                >
                  <Form.Group typeof="submit">
                    <Form.Control
                      value={categoryName}
                      onChange={(e) => {
                        console.log(e);
                        setCategoryName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
              </>
            ) : (
              <h1>{category.name}</h1>
            )}
            <div className={styles.buttonWrapper}>
              {/* Click to open edit field. */}
              <MdEdit
                onClick={() => {
                  setCategoryName(category.name as string);
                  setCurrentCategoryId(category.id);
                  if (!edit) setEdit(true);
                  else setEdit(false);
                }}
              />
              <RiDeleteBin7Fill
                onClick={() => {
                  // Set the show modal state here.
                  // Set the current selected category for deletion
                  setCurrentCategoryId(category.id);
                  setShowModal(true);
                }}
              />
            </div>
          </div>

          {/* Store the current position of the selected element and only
            render the jobs expanded for that category */}
          <ExpandLarge
            showJobs={showJobs}
            setShowJobs={setShowJobs}
            //Pass in the currentSelectedCategory and the current category.id
            currentCategoryId={currentCategoryId}
            setCurrentCategoryId={setCurrentCategoryId}
            iteratedCategoryId={category.id}
          />
        </div>
        {/* Iterated category id matched the current selected */}
        {showJobs && category.id === currentCategoryId && (
          <>
            <AddJobButton handleSubmitJob={handleSubmitJob} />
            {/* Check if there are jobs contained within each category. If not, */}
            {/* display a message. */}
            {category.jobs.length ? (
              <>
                <div className={styles.jobWrapper}>
                  <h2>Added</h2>
                  {category.jobs
                    .filter((job) => job.status.toLowerCase() === "added")
                    .map((job: Job) => {
                      if (job) {
                        return <JobListElement job={job} key={Uuid()} />;
                      }
                      return null;
                    })}
                  {category.jobs.filter(
                    (job) => job.status.toLowerCase() === "added"
                  ).length === 0 && <p>Nothing to display</p>}
                </div>
                <div className={styles.jobWrapper}>
                  <h2>Applied</h2>
                  {category.jobs
                    .filter((job) => job.status.toLowerCase() === "applied")
                    .map((job: Job) => {
                      if (job) {
                        return <JobListElement job={job} key={Uuid()} />;
                      }
                      return null;
                    })}
                  {/* After checking and there was no jobs to list, the return null
                    automaticlly checks the filter again to see if there are is
                    any length. Of course, in the case of nothing returned, it will be zero
                    therefore allowing the Nothing to display text to appear. */}
                  {category.jobs.filter(
                    (job) => job.status.toLowerCase() === "applied"
                  ).length === 0 && <p>Nothing to display</p>}
                </div>
                <div className={styles.jobWrapper}>
                  <h2>Accepted</h2>
                  {/* Create a filter and map fuction here. Filter by the  */}
                  {category.jobs
                    .filter((job) => job.status.toLowerCase() === "accepted")
                    .map((job: Job) => {
                      if (job) {
                        return <JobListElement job={job} key={Uuid()} />;
                      }
                      return null;
                    })}
                  {category.jobs.filter(
                    (job) => job.status.toLowerCase() === "accepted"
                  ).length === 0 && <p>Nothing to display</p>}
                </div>
                <div className={styles.jobWrapper}>
                  <h2>Rejected</h2>
                  {category.jobs
                    .filter((job) => job.status.toLowerCase() === "rejected")
                    .map((job: Job) => {
                      if (job) {
                        return <JobListElement job={job} key={Uuid()} />;
                      }
                      return null;
                    })}
                  {category.jobs.filter(
                    (job) => job.status.toLowerCase() === "rejected"
                  ).length === 0 && <p>Nothing to display</p>}
                </div>
              </>
            ) : (
              <>
                <h2>No jobs to display</h2>
              </>
            )}
          </>
        )}
        {/* Pass in whether we are deleting a job or category. */}
        {/* Pass in the handleDelete function and also the id. */}
        <DangerModal
          show={showModal}
          handleDelete={handleDeleteCategory}
          currentId={currentCategoryId}
          setShow={setShowModal}
        />
      </div>
    );
  });

  return (
    <>
      {/* IF THE CATEGORIES ARRAY HAS A LENGTH, CALL THE categoriesList variable */}
      {data && data.user.categories.length ? (
        <>{categoriesList}</>
      ) : (
        <>
          <br />
          <br />
          <h2>No categories to display</h2>
        </>
      )}
      {/* Returning the list of categories if the array within the user has contents. */}
    </>
  );
}

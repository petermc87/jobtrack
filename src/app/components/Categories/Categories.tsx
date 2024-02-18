import { useQuery } from "@apollo/client";
import { Job, User } from "@prisma/client";
import { useState } from "react";
import { GET_USER } from "../../../../graphql/queries";
import AddJobButton from "../AddJobButton/AddJobButton";
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
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email: user?.email },
  });

  // State for handling show jobs
  const [showJobs, setShowJobs] = useState(false);

  // State for holding current selected category for viewing jobs.
  const [currentSelected, setCurrentSelected] = useState(0);

  if (loading) return null;
  if (error) return `Error: ${error}`;

  // List of categories to be returned

  // Check if data and data.user exist
  if (!data || !data.user) return null;

  // Check if data.user.categories exist
  if (!data.user.categories) return <div>No categories found.</div>;

  const categoriesList = data.user.categories.map(
    (category: CategoryTypes, i: number) => {
      return (
        <div key={category.id} className={styles.allCategoriesWrapper}>
          <div className={styles.headingWrapper}>
            <h1>{category.name}</h1>
            {/* Store the current position of the selected element and only
            render the jobs expanded for that category */}
            <ExpandLarge
              showJobs={showJobs}
              setShowJobs={setShowJobs}
              setCurrentSelected={setCurrentSelected}
              currentSelected={currentSelected}
              i={i}
            />
          </div>

          {/* Check if there are jobs contained within each category. If not, */}
          {/* display a message. */}
          {showJobs && i === currentSelected && (
            <>
              {category.jobs.length ? (
                <>
                  {category.jobs?.map((job: Job) => {
                    return (
                      <div className={styles.jobWrapper}>
                        <JobListElement job={job} />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <h2>No jobs to display</h2>
                </>
              )}

              <AddJobButton />
            </>
          )}
        </div>
      );
    }
  );

  return (
    <>
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

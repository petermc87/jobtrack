import { useQuery } from "@apollo/client";
import { Job, User } from "@prisma/client";
import { GET_USER } from "../../../../graphql/queries";

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

  console.log(data);
  if (loading) return null;
  if (error) return `Error: ${error}`;

  // List of categories to be returned

  // Check if data and data.user exist
  if (!data || !data.user) return null;

  // Check if data.user.categories exist
  if (!data.user.categories) return <div>No categories found.</div>;
  // console.log(data.user.categories);

  const categoriesList = data.user.categories.map((category: CategoryTypes) => {
    return (
      <div key={category.id}>
        <h2>JobList</h2>
        {category.jobs?.map((job: Job) => {
          return (
            <>
              {/* If there are no categories, display: No categories to display`` */}
              {!job ? (
                <h2>No jobs to display</h2>
              ) : (
                <p key={job.id}>{job.title}</p>
              )}
            </>
          );
        })}
      </div>
    );
  });

  return (
    <>
      {data.user.categories.length() !== 0 ? (
        <>{categoriesList && categoriesList}</>
      ) : (
        <h2>No categories to display</h2>
      )}
      {/* Returning the list of categories if the array within the user has contents. */}
    </>
  );
}

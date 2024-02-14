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

  if (loading) return null;
  if (error) return `Error: ${error}`;

  // List of categories to be returned
  const categoriesList = data.user.categories.map((category: CategoryTypes) => {
    return (
      <div key={category.id}>
        <h1>{category.name}</h1>
        <h2>JobList</h2>
        {category.jobs?.map((job: Job) => {
          return <p>{job.title}</p>;
        })}
      </div>
    );
  });
  console.log(data);

  return (
    <>
      <>{categoriesList}</>
    </>
  );
}

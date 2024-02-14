import { useQuery } from "@apollo/client";
import { Category, User } from "@prisma/client";
import { GET_USER } from "../../../../graphql/queries";

type UserTypes = {
  user: User | undefined;
};

export default function Categories({ user }: UserTypes) {
  // Side affect to load categories.

  // let currentUser;
  // if (!user === undefined) {
  //   currentUser = user;
  // }
  console.log(user);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email: user?.email },
  });

  if (loading) return null;
  if (error) return `Error: ${error}`;

  // List of categories to be returned
  const categoriesList = data.user.categories.map((category: Category) => {
    return (
      <div key={category.id}>
        <h1>{category.name}</h1>
        <h2>JobList</h2>
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

import { useQuery } from "@apollo/client";
import { Category, User } from "@prisma/client";
import { GET_USER } from "../../../../graphql/queries";

type UserTypes = {
  user: User | undefined;
};

let data: any;
let error: any;
let loading: any;
export default function Categories({ user }: UserTypes) {
  // Side affect to load categories.

  // Check if user is being passed in
  //   console.log(user);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email: user?.email },
  });

  if (loading) return null;
  if (error) return `Error: ${error}`;

  // List of categories to be returned
  const categoriesList = data.user.categories.map((category: Category) => {
    return <h1 key={category.id}>{category.name}</h1>;
  });
  //   console.log(data);

  return <>{categoriesList}</>;
}

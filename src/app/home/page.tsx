"use client";
import { useMutation } from "@apollo/client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { NEW_CATEGORY } from "../../../graphql/mutations";
import { GET_USER } from "../../../graphql/queries";
import AddButton from "../components/AddButton/AddButton";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import TitleText from "../components/TitleText/TitleText";
import styles from "./page.module.scss";

// Declare type for the object within the session data.
type SessionData = {
  user: User;
};

export default function Home() {
  // Assign that type to the 'data' passed into the session
  // hook.

  const { data } = useSession() as { data: SessionData | null };

  let userData: User;

  if (data) {
    userData = data.user;
  }

  // State for category.
  const [categoryName, setCategoryName] = useState("");

  // GraphQL - Create Category
  const [newCategory, { loading, error }] = useMutation(NEW_CATEGORY, {
    refetchQueries: [GET_USER, "GetUser"],
  });

  const handleCreateCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Error handling
    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submission Error: {error.message}</p>;

    newCategory({ variables: { name: categoryName, userId: userData?.id } });
    setCategoryName("");
  };

  return (
    <div>
      <NavBar />
      <div className={styles.homeWrapper}>
        {/* NOTE: Adding custom styling on top of the title component */}
        <div className={styles.contentWrapper}>
          <TitleText
            text={`Welcome, ${data?.user.username}!`}
            style={{
              marginTop: "8rem",
              marginBottom: "8rem",
            }}
          />
          <h1>Create a Job Category</h1>
          <Form
            className={styles.createCat}
            onSubmit={(e) => handleCreateCategory(e)}
          >
            <Form.Control
              type="text"
              placeholder="Eg. Construction, Software Development, etc."
              value={categoryName}
              required
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <AddButton />
          </Form>

          {/*TODO: Map list of created categories. */}
          <Categories user={data?.user} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

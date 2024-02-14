"use client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import { Form } from "react-bootstrap";
import AddButton from "../components/AddButton/AddButton";
import NavBar from "../components/NavBar/NavBar";
import TitleText from "../components/TitleText/TitleText";
import styles from "./page.module.scss";

// Declare type for the object within the session data.
type SessionData = {
  user: User;
};

export default function Home() {
  //   Assign that type to the 'data' passed into the session
  // hook.
  const { data } = useSession() as { data: SessionData | null };

  // // GraphQL
  // const [newUser, {loading, error}] = useMutation(NEW_, {
  //   refetchQueries:
  // })

  // TODO: Consume the useMutation hook to create job category
  const handleCreateCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <Form className={styles.createCat}>
            <Form.Control />
            <AddButton />
          </Form>

          {/*TODO: Map list of created categories. */}
          <h1>Construction Placeholder</h1>
        </div>
      </div>
    </div>
  );
}

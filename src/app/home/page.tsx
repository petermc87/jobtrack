"use client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
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
  console.log(data);

  // return <h1>Welcome, {data?.user.name}</h1>;
  return (
    <div>
      <NavBar />
      <div className={styles.homeWrapper}>
        <TitleText
          text={`Welcome, ${data?.user.username}`}
          style={{ color: "#11e0c0", marginTop: "10rem" }}
        />
      </div>
    </div>
  );
}

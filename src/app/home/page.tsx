"use client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

// Declare type for the object within the session data.
type SessionData = {
  user: User;
};

export default function Home() {
  //   Assign that type to the 'data' passed into the session
  // hook.
  const { data } = useSession() as { data: SessionData | null };
  console.log(data);

  return <h1>Welcome, {data?.user.name}</h1>;
}

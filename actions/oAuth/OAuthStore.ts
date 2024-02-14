import { User } from "@prisma/client";
import db from "../../prisma/db";

export default async function oauthStore(user: User) {
  //1. Check if a user already exists
  const existingUser = await db.user.findUnique({
    where: {
      id: user.id as string,
    },
  });

  //2. If the user doesnt exist, create a new one.
  if (!existingUser) {
    const newUser = await db.user.create({
      data: {
        id: user.id as string,
        name: user.name as string,
        email: user.email as string,
        username: user.name as string,
        password: "",
      },
    });

    return newUser;
  } else {
    return existingUser;
  }
}

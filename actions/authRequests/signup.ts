"use server";

import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import db from "../../prisma/db";
export default async function Signup({
  email,
  password,
  username,
  name,
}: User) {
  //Checker to see if the email exists already
  let checkEmail;

  try {
    checkEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error(error);
  }

  // Statement to check whether it exists or not
  if (checkEmail) {
    return "Email already exists";
  } else {
    // If there is no existing email, hash and salt new password.
    const saltRounds = 10;
    let saltedPassword = await bcrypt.hash(password, saltRounds);
    let newUser;
    // Adding to the database.
    try {
      newUser = await db.user.create({
        data: {
          email: email,
          password: saltedPassword,
          name: name,
          username: username,
        },
      });
    } catch (error) {
      console.error(error);
      return "There was an error when trying to signup. Please try again later";
    }
    return newUser;
  }
}

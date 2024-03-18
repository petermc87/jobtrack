import { useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { NEW_USER } from "../../../graphql/mutations";
import { useAppSelector } from "../redux/store";

type loginProps = {
  email: string;
  password: string;
  username: string;
  name: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

// Take in the login details from the input filds.
// If the demo button is selected, the
export default async function Login({
  email,
  password,
  username,
  name,
  setMessage,
}: loginProps) {
  //Retrieve the redux state
  const isOpen = useAppSelector((state) => state.signupReducer.value.isOpen);
  // Apollo Client
  const [newUser, { data, loading, error }] = useMutation(NEW_USER);

  // Router to home on signup/login
  const router = useRouter();

  if (isOpen === "signup") {
    await newUser({
      variables: {
        name: name,
        username: username,
        email: email,
        password: password,
      },
    });
  }
  await signIn("credentials", {
    emai: email,
    password: password,
    redirect: false,
  }).then(({ ok, status }: any) => {
    if (ok === true) {
      router.push("/home");
    } else {
      setMessage(status + ": Incorrect login credentials");
    }
  });
}

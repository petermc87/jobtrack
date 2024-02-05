"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// Children will be a react component/page being passed
// in here. This is because Next is built upon React.
type AuthTypes = {
  children?: React.ReactNode;
};

export default function AuthProvider({ children }: AuthTypes) {
  return <SessionProvider>{children}</SessionProvider>;
}

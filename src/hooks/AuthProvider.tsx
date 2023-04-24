import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useAuth } from "./useAuth";

export const AuthProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

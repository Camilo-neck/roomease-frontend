import { createContext } from "react";
import { LoggedUserI } from "@/lib/interfaces";

interface AuthContextI {
  user: LoggedUserI | null;
  setUser: (user_id: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextI>({
  user: null,
  setUser: () => {},
});

import { LoggedUserI } from "@/dtos";
import { createContext } from "react";
// import { LoggedUserI } from "@/utils/interfaces";

interface AuthContextI {
	user: LoggedUserI | null;
	setUser: (user_id: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextI>({
	user: null,
	setUser: () => {},
});

import { useEffect } from "react";
import { useUser } from "./useUser";
import jwt from "jsonwebtoken";
import { useCookies } from "./useCookie";

export const useAuth = () => {
	const { user, setUser, addUser } = useUser();
	const { getCookie } = useCookies();

	useEffect(() => {
		async function f() {
			const cookie = getCookie("auth-token");
			console.log(cookie)
			if (cookie) {
				const decoded: any = jwt.decode(cookie);
				if (decoded) {
					const { _id } = decoded;
					console.log(_id)
					addUser(_id, cookie);
				}
			}
		}
		f();
	}, []);

	return { user, setUser };
};

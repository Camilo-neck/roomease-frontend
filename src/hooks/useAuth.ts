import { useEffect } from "react";
import { useUser } from "./useUser";
import jwt from "jsonwebtoken";
import { useCookies } from "./useCookie";

export const useAuth = () => {
  const { user, addUser } = useUser();
  const { getCookie } = useCookies();

  useEffect(() => {
    async function f() {
      const cookie = getCookie("auth-token");
      if (cookie) {
        const decoded: any = jwt.decode(cookie);
        if (decoded) {
          const { _id } = decoded;
          addUser(_id, cookie);
        }
      }
    }
    f();
  }, []);

  return { user };
};

import { deleteCookie, setCookie } from "@/lib/cookie";
import { setUser } from "@/redux/slices/user.slice";
import { deleteUserInfo } from "@/redux/thunks/user.thunk";
import jwt from "jsonwebtoken";

export const loginUser =
  (user: { email: string; password: string }): any =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const { _id, name, email } = await response.json();
      dispatch(setUser({ _id, name, email }));

      let token = response.headers.get("auth-token");

      if (token) {
        const unEncryptedToken: any = jwt.decode(token);
        const expiryDate = new Date(unEncryptedToken.exp * 1000);
        setCookie(
          "auth-token",
          token,
          new Date(),
          null,
          unEncryptedToken.exp * 1000 - Date.now()
        );
      }

      return response;
    } catch (error) {
      return error;
    }
  };

export async function registerUser(user: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export const logoutUser =
  (): any =>
  async (dispatch: (arg0: { payload: any; type: string }) => void) => {
    try {
      deleteCookie("auth-token");
      dispatch(deleteUserInfo());
    } catch (error) {
      return error;
    }
  };

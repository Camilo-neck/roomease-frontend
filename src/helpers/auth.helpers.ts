import { deleteCookie, getCookie, setCookie } from "@/utils/cookie";
import { setUser } from "@/redux/slices/user.slice";
import { deleteUserInfo } from "@/redux/thunks/user.thunk";
import jwt from "jsonwebtoken";
import { UserI } from "@/dtos";

export const loginUser =
	(reqUser: { email: string; password: string }): any =>
	async (dispatch: (arg0: { payload: any; type: string }) => void) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqUser),
			});
			const data = await response.json();
			if (data.message) {
				if (data.message === "Wrong password") {
					throw new Error("Contraseña incorrecta");
				}
				if (data.message === "Wrong Email") {
					throw new Error("Email incorrecto");
				}
			}
			const { user, refreshToken } = data;
			const { _id, name, email } = user;
			dispatch(setUser({ _id, name, email }));

			let token = response.headers.get("auth-token");

			if (token) {
				const unEncryptedToken: any = jwt.decode(token);
				setCookie("auth-token", token, new Date(), null, unEncryptedToken.exp * 1000 - Date.now());
			}
			if (refreshToken) {
				console.log("refreshToken", refreshToken);
				const unEncryptedRefreshToken: any = jwt.decode(refreshToken);
				setCookie("refresh-token", refreshToken, new Date(), null, unEncryptedRefreshToken.exp * 1000 - Date.now());
			}

			return response;
		} catch (error) {
			return error;
		}
	};

export async function registerUser(user: UserI): Promise<Response> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return response;
	} catch (error) {
		console.log(error);
		return error as Response;
	}
}

export const logoutUser = (): any => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
	try {
		deleteCookie("auth-token");
		deleteCookie("refresh-token");
		dispatch(deleteUserInfo());
	} catch (error) {
		return error;
	}
};

export const refreshToken = async (refreshToken: string | undefined): Promise<any> => {
	if (!refreshToken) return;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refreshToken`, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken }),
		});
		const data = await response.json();
		const { token } = data;
		if (token) {
			const unEncryptedToken: any = jwt.decode(token);
			setCookie("auth-token", token, new Date(), null, unEncryptedToken.exp * 1000 - Date.now());
		}
		return token;
	} catch (error) {
		return error;
	}
};

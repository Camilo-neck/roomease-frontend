import { UserI } from "@/dtos";
import { edgeRefreshToken } from "./auth.helpers";
import { getCookie } from "@/utils/cookie";

export const fetchUserData = async (uid: string, token: string, rft: string | undefined) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${uid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});

		if (response.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then((data) => data?.newToken);
				const userData: UserI = await fetchUserData(uid, newToken as string, rft);
				return userData ? userData : {};
			} else {
				console.log("Unauthorized");
				return {};
			}
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

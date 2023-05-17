import jwt from "jsonwebtoken";
import { getCookie } from "@/utils/cookie";
import { HouseI } from "@/dtos";
import { edgeRefreshToken, refreshToken } from "./auth.helpers";

export const fetchHouses = async (uid: string, token: string, rft: string | undefined) => {
	try {
		const houses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/houses`, {
			method: "GET",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
				"auth-token": token,
			},
		}).then((res) => res.json());
		return houses ? houses : [];
	} catch (err: any) {
		if (err.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then((data) => data?.newToken);
				const houses: HouseI[] = await fetchHouses(uid, newToken as string, rft);
				return houses ? houses : [];
			}
			console.log("Unauthorized");
		}
		console.log(err);
		return [];
	}
};

export const getHouse = async (houseId: string, token: string, rft: string | undefined) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/${houseId}`, {
		method: "GET",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	if (response.status !== 200) {
		if (response.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then((data) => data?.newToken);
				const house: HouseI = await getHouse(houseId, newToken as string, rft);
				return house ? house : {};
			} else {
				console.log("Unauthorized");
				return {};
			}
		}
	}

	const house = await response.json();

	return house ? house : {};
};

export const createHouse = async (token: string, house: HouseI): Promise<any> => {
	if (!house.house_picture) {
		house.house_picture =
			"https://images.adsttc.com/media/images/5d34/e507/284d/d109/5600/0240/large_jpg/_FI.jpg?1563747560";
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses`, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify({ ...house }),
	});

	if (response.status !== 200) {
		if (response.status === 401) {
			const refreshTokenCookie = getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await refreshToken(refreshTokenCookie);
				const res = await createHouse(newToken, house);
				return res;
			}
			console.log("Unauthorized");
		}
	}

	return response;
};

export const editHouse = async (token:string, house: HouseI, house_id: string): Promise<any> => {
	if (!house.house_picture) {
		house.house_picture =
			"https://images.adsttc.com/media/images/5d34/e507/284d/d109/5600/0240/large_jpg/_FI.jpg?1563747560";
	}
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/${house_id}`, {
		method: "PUT",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify({ ...house, users: undefined }),
	});

	if (response.status !== 200) {
		if (response.status === 401) {
			const refreshTokenCookie = getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await refreshToken(refreshTokenCookie);
				const res = await editHouse(newToken, house, house_id);
				return res;
			}
			console.log("Unauthorized");
		}
	}

	return response;
};

export const joinHouse = async (token: string, house_code: string): Promise<any> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/join/${house_code.replace("#", "_")}`, {
		method: "PUT",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});
	if (response.status !== 200) {
		if (response.status === 401) {
			const refreshTokenCookie = getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await refreshToken(refreshTokenCookie);
				const res = await joinHouse(newToken, house_code);
				return res;
			}
			console.log("Unauthorized");
		}
	}

	return response;
};

export const acceptPendingUser = async (token: string, houseId: string, userId: string) => {
	const payload = {
		userId,
		accept: true,
	};
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/handleJoin/${houseId}`, {
		method: "PUT",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(payload),
	}).then((res) => res.json());

	if (!response.ok) {
		if (response.status === 401) {
			const refreshTokenCookie = getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await refreshToken(refreshTokenCookie);
				const response: any = await acceptPendingUser(newToken, houseId, userId);
				return response;
			}
			console.log("Unauthorized");
		}
		return new Error(response.message);
	}

	return response;
};

export const rejectPendingUser = async (houseId: string, userId: string) => {
	const token = getCookie("auth-token");

	const payload = {
		userId,
		accept: false,
	};
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/handleJoin/${houseId}`, {
		method: "PUT",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(payload),
	}).then((res) => res.json());

	if (!response.ok) {
		if (response.status === 401) {
			const refreshTokenCookie = getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await refreshToken(refreshTokenCookie);
				const response: any = await rejectPendingUser(houseId, userId);
				return response;
			}
			console.log("Unauthorized");
		}
		return new Error(response.message);
	}

	return response;
};

import jwt from "jsonwebtoken";
import { getCookie } from "@/utils/cookie";
import { HouseI } from "@/dtos";

export const fetchHouses = async (uid: string, token: string) => {
	const houses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/houses`, {
		method: "GET",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/json",
			"auth-token": token,
		},
	}).then((res) => res.json());

	return houses ? houses : [];
};

export const getHouse = async (houseId: string, token: string) => {
	try {
		const house = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/${houseId}`, {
			method: "GET",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
				"auth-token": token,
			},
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));

		return house ? house : [];
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const createHouse = async (house: HouseI): Promise<any> => {
	const token = getCookie("auth-token");
	const { _id } = jwt.decode(token) as { _id: string };

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses`, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
				"auth-token": token,
			},
			body: JSON.stringify({ ...house }),
		});

		return response;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const joinHouse = async (house_code: string): Promise<any> => {
	const token = getCookie("auth-token");
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/houses/join/${house_code.replace("#", "_")}`, {
			method: "PUT",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
				"auth-token": token,
			},
		});
		console.log(response);

		return response;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const acceptPendingUser = async (houseId: string, userId: string) => {
	const token = getCookie("auth-token");

	const payload = {
		userId,
		accept: true,
	};
	try {
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
			throw new Error(response.message);
		}

		return response;
	} catch (err) {
		console.log(err);
	}
};

export const rejectPendingUser = async (houseId: string, userId: string) => {
	const token = getCookie("auth-token");

	const payload = {
		userId,
		accept: false,
	};
	try {
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
			throw new Error(response.message);
		}

		return response;
	} catch (err) {
		console.log(err);
	}
};

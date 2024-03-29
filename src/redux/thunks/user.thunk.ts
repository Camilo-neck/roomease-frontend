"use client";

import { deleteUser, setUser } from "../slices/user.slice";

export const fetchUserInfo =
	(uid: string, token: string): any =>
	async (dispatch: (arg0: { payload: any; type: string }) => void) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": token,
			},
		});
		const { _id, name, email } = await res.json();
		dispatch(setUser({ _id, name, email }));
	};

export const deleteUserInfo = (): any => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
	dispatch(deleteUser());
};

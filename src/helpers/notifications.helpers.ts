import { NotificationI } from "@/dtos";
import { getCookie } from "@/utils/cookie";
import { edgeRefreshToken } from "./auth.helpers";

export async function getNotifications(token: string, rft: string | undefined) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	if (!response.ok) {
		if (response.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then((data) => data?.newToken);
				const notifications: NotificationI[] = await getNotifications(newToken as string, rft);
				return notifications ? notifications : [];
			}
			console.log("Unauthorized");
		}
	}

	const data = await response.json();
	return data;
}

export async function readNotification(token: string, rft: string | undefined, notificationId: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notificationId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	if (!response.ok) {
		if (response.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then((data) => data?.newToken);
				const notification: NotificationI = await readNotification(newToken as string, rft, notificationId);
				return notification ? notification : [];
			}
			console.log("Unauthorized");
		}
	}

	const data = await response.json();
	return data;
}

export async function deleteNotification(token: string, rft: string | undefined, notificationId: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${notificationId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
	});

	if (!response.ok) {
		if (response.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then((data) => data?.newToken);
				const notification: NotificationI = await deleteNotification(newToken as string, rft, notificationId);
				return notification ? notification : [];
			}
			console.log("Unauthorized");
		}
	}

	const data = await response.json();
	return data;
}

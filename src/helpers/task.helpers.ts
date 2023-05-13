import { TaskI } from "@/dtos";
import { edgeRefreshToken } from "./auth.helpers";
import { getCookie } from "@/utils/cookie";

export const getTasksByUser = async (hid: string, uid: string, token: string, rft: string | undefined) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks?user_id=${uid}&house_id=${hid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});

		if (res.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then(data => data?.newToken);
				const tasks: TaskI[] = await getTasksByUser(hid, uid, newToken as string, rft);
				return tasks ? tasks : [];
			}
			console.log("Unauthorized");
			return [];
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getTasksByHouse = async (hid: string, token: string, rft: string | undefined) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks?house_id=${hid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});

		if (res.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then(data => data?.newToken);
				const tasks: TaskI[] = await getTasksByHouse(hid, newToken as string, rft);
				return tasks ? tasks : [];
			}
			console.log("Unauthorized");
			return [];
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const createTask = async (task: TaskI, token: string, rft: string | undefined) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
			body: JSON.stringify(task),
		});

		if (res.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then(data => data?.newToken);
				const newTask: TaskI = await createTask(task, newToken as string, rft);
				return newTask ? newTask : null;
			}
			console.log("Unauthorized");
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const checkTask = async (tid: string, token: string, rft: string | undefined) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/done/${tid}`, {
			method: "PUT", // Should be PATCH
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});

		if (res.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then(data => data?.newToken);
				const task: TaskI = await checkTask(tid, newToken as string, rft);
				return task ? task : null;
			}
			console.log("Unauthorized");
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const updateTask = async (tid: string, task: TaskI, token: string, rft: string | undefined) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${tid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
			body: JSON.stringify({ ...task, _id: undefined, house_id: undefined }),
		});

		if (res.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then(data => data?.newToken);
				const newTask: TaskI = await updateTask(tid, task, newToken as string, rft);
				return newTask ? newTask : null;
			}
			console.log("Unauthorized");
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteTask = async (tid: string, token: string, rft: string | undefined) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${tid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});

		if (res.status === 401) {
			const refreshTokenCookie = rft ? rft : getCookie("refresh-token");
			if (refreshTokenCookie) {
				const newToken = await edgeRefreshToken(refreshTokenCookie).then(data => data?.newToken);
				const task: TaskI = await deleteTask(tid, newToken as string, rft);
				return task ? task : null;
			}
			console.log("Unauthorized");
			return null;
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

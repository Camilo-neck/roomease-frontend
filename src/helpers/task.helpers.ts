import { TaskI } from "@/dtos";

export const getTasksByUser = async (hid: string, uid: string, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/get?user_id=${uid}&house_id=${hid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getTasksByHouse = async (hid: string, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/get?house_id=${hid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const createTask = async (task: TaskI, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const checkTask = async (tid: string, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/done/${tid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const updateTask = async (tid: string, task: TaskI, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/update/${tid}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

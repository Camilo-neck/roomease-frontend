import { TaskI } from "@/dtos";

export const getTasksByUser = async (hid: string, uid: string, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks?user_id=${uid}&house_id=${hid}`, {
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
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks?house_id=${hid}`, {
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
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
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
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/done/${tid}`, {
			method: "PUT", // Should be PATCH
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
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${tid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
			body: JSON.stringify({ ...task, _id: undefined, house_id: undefined }),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteTask = async (tid: string, token: string) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${tid}`, {
			method: "DELETE",
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

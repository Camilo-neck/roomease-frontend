export const getUserTasks = async (hid: string, uid: string, token: string) => {
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
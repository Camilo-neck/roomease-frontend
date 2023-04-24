export const fetchUserData = async (uid: string, token: string) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getInfo/${uid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": `${token}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

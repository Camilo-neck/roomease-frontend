import jwt from 'jsonwebtoken';

export const fetchHouses = async (uid: string, token: string) => {
	const houses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/houses?userId=${uid}`, {
		method: 'GET',
		headers: {
			'Accept': '*/*',
			'Content-Type': 'application/json',
			'auth-token': token,
		},
	})
	.then((res) => res.json())

	console.log(houses);

	return houses ? houses : [];
}
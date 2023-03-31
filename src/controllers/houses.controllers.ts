import jwt from 'jsonwebtoken';
import { getCookie } from '@/lib/cookie';

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

export const createHouse = async (house: any) => {
	const token = getCookie('auth-token');
	const { _id } = jwt.decode(token) as { _id: string };
	
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/house/create?userId=${_id}`, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'auth-token': token,
			},
			body: JSON.stringify({ ...house }),
		})
		.then((res) => res.json());

		if (!response.ok) {
			throw new Error(response.message);
		}

		return response;
	} catch(err) {
		console.log(err);
	}
}

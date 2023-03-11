import { deleteCookie, setCookie } from "@/lib/cookie";
import { setUser } from "@/redux/slices/user.slice";
import jwt, { JwtPayload } from "jsonwebtoken";

// export async function loginUser(user: any) {
// 	try {
// 		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
// 			method: 'POST',
// 			headers: {
// 				'Accept': '*/*',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(user),
// 		});
// 		let token = response.headers.get('auth-token');
// 		console.log(token);
		
// 		if (token) {
// 			console.log('a')
// 			const unEncryptedToken: any = jwt.decode(token);
// 			const expiryDate= new Date(unEncryptedToken.exp * 1000);
// 			console.log(unEncryptedToken)
// 			// const { id, exp } = JSON.parse(unEncryptedToken);
// 			// console.log(id, exp);
// 			setCookie('auth-token', token, new Date(), null, unEncryptedToken.exp * 1000 - Date.now());
// 		}

// 		return response;
// 	} catch (error) {
// 		return error;
// 	}
// }

export const loginUser = (user: {email: string; password: string}): any => async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const { _id, name, email } = await response.json();
		console.log({ _id, name, email })
		dispatch(setUser({ _id, name, email }));

		let token = response.headers.get('auth-token');
		console.log(token);
		
		if (token) {
			console.log('a')
			const unEncryptedToken: any = jwt.decode(token);
			const expiryDate= new Date(unEncryptedToken.exp * 1000);
			console.log(unEncryptedToken)
			// const { id, exp } = JSON.parse(unEncryptedToken);
			// console.log(id, exp);
			setCookie('auth-token', token, new Date(), null, unEncryptedToken.exp * 1000 - Date.now());
		}

		return response;
	} catch (error) {
		return error;
	}
}

export async function registerUser(user: any) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		return response;
	} catch (error) {
		return error;
	}
}

export async function logoutUser() {
	const cookie = deleteCookie('auth-token');
}
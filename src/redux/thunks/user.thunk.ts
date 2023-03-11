'use client';

import { setUser } from "../slices/user.slice";

export const fetchUserInfo = (uid: string): any => async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
	console.log('Thunk a')
	const res = await fetch(`http://localhost:5001/profile?userId=${uid}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBiZWZiNDM5OGY4N2EzMWVmMDQ5NTYiLCJpYXQiOjE2Nzg1MTAxMzMsImV4cCI6MTY3ODUxMTkzM30.w_9GplMLM1gKA11U97rajeUB3Sr8hEpYuIZ3W2oC3WA'
		},
	});
	console.log('Res:')
	console.log(res)
	const {_id, name, email} = await res.json();
	dispatch(setUser({ _id, name, email }));
}
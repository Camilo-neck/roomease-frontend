"use client";

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const UserSlice = createSlice({
	name: "user",
	initialState: {
		_id: null,
		name: null,
		email: null,
	},
	reducers: {
		setUser: (state, action) => {
			state._id = action.payload._id;
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		deleteUser: (state) => {
			state._id = null;
			state.name = null;
			state.email = null;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			if (action.payload.user) {
				return {
					...state,
					...action.payload.user,
				};
			}
			return state;
		},
	},
});

export const { setUser, deleteUser } = UserSlice.actions;
export const selectUser = (state: any) => state.user;
export default UserSlice.reducer;

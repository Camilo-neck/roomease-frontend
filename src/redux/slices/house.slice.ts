"use client";

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const HouseSlice = createSlice({
  name: "house",
  initialState: {
    _id: null,
    name: null,
    adress: null,
    members: null,
  },
  reducers: {
    setHouse: (state, action) => {
      state._id = action.payload.id;
      state.name = action.payload.name;
      state.adress = action.payload.email;
      state.members = action.payload.members;
    },
    deleteHouse: (state) => {
      state._id = null;
      state.name = null;
      state.adress = null;
      state.members = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.house) {
        return {
          ...state,
          ...action.payload.house,
        };
      }
      return state;
    },
  },
});

export const { setHouse, deleteHouse } = HouseSlice.actions;
export const selectHouse = (state: any) => state.house;
export default HouseSlice.reducer;

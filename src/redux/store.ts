import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";

import userReducer from "./slices/user.slice";

export const store = () =>
  configureStore({
    reducer: {
      // Add your reducers here
      user: userReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  void,
  AppStore,
  unknown,
  Action<string>
>;
export const wrapper = createWrapper<AppStore>(store);

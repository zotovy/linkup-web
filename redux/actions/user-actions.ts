import { createAction, ThunkAction } from "@reduxjs/toolkit";
import { UserTypes } from "@/redux/types";
import { AnyAction } from "redux";
import { State } from "@/redux/reducers/root";
import UserService from "@/services/user-service";

export const setUserAction = createAction<User | undefined | null>(UserTypes.SetUser);

// ---------- Async actions ----------
export function fetchUserAction(id: number): ThunkAction<void, State, unknown, AnyAction> {
    return async (dispatch, getState) => {
        const user = await UserService.fetchUser(id);
        dispatch(setUserAction(user));
    }
}

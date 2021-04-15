import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import rootReducer, { State } from "./reducers/root";
import { initialState as userReducerState } from "./reducers/user";

const initialState: State = {
    userReducer: userReducerState
};

const makeStore: MakeStore<State> = (context: Context) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

export const wrapper = createWrapper<State>(makeStore, {
   debug: process.env.MODE !== "production",
});

export type { State } from "./reducers/root";


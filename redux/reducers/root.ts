import { combineReducers } from "redux";
import userReducer from "@/redux/reducers/user";
import { State as UserReducerState } from "@/redux/reducers/user";

const rootReducer = combineReducers({
    userReducer,
});

export type State = {
    userReducer: UserReducerState,
}

export default rootReducer;

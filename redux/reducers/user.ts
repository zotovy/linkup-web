import { AnyAction } from "redux";
import { setUserAction, fetchUserAction } from "@/redux/actions/user-actions";

export type State = {
    user?: User | null,
}

export const initialState: State = {

}

export default (state: State = initialState, action: AnyAction):State => {

    if (setUserAction.match(action)) {
        return {
            ...state,
            user: action.payload
        }
    }

    return state;
}

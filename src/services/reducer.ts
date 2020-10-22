import { combineReducers } from "redux";
import { LOGIN_OK, LOGOUT } from "./types";
const initialState = {
	loaded: false,
	authenticated: localStorage.getItem("ps_token") ? true : false,
	token: localStorage.getItem("ps_token"),
};

const globalReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_OK:
			return {
				...state,
				authenticated: true,
				token: action.payload?.token,
			};
		case LOGOUT:
			return {
				...initialState,
				authenticated: false,
			};
		default:
			return { ...state };
	}
};

const reducer = combineReducers({
	globalReducer,
});

export default reducer;

import { combineReducers } from 'redux';
import { ADD_TO_CART, LOGIN_OK, LOGOUT } from './types';
const initialState = {
	loaded: false,
	authenticated: localStorage.getItem('uc_token') ? true : false,
	token: localStorage.getItem('uc_token'),
	cart: []
};

const globalReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case LOGIN_OK:
			return {
				...state,
				authenticated: true,
				token: action.payload?.token
			};
		case LOGOUT:
			return {
				...initialState,
				authenticated: false
			};
		case ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, action.payload]
			};
		default:
			return { ...state };
	}
};

const reducer = combineReducers({
	globalReducer
});

export default reducer;

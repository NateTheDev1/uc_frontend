import { combineReducers } from 'redux';
import {
	ADD_TO_CART,
	LOGIN_OK,
	LOGOUT,
	REPLACE_CART,
	SET_ORDER
} from './types';
const initialState = {
	loaded: false,
	authenticated: localStorage.getItem('uc_token') ? true : false,
	token: localStorage.getItem('uc_token'),
	cart: [],
	userId: localStorage.getItem('uc_userId'),
	userType: 'CUSTOMER',
	orderId: null
};

const globalReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case LOGIN_OK:
			return {
				...state,
				authenticated: true,
				token: action.payload.token,
				userId: action.payload.user.id,
				userType: action.payload.type
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
		case REPLACE_CART:
			return { ...state, cart: action.payload.cart };
		case SET_ORDER:
			return { ...state, orderId: action.payload.orderId };
		default:
			return { ...state };
	}
};

const reducer = combineReducers({
	globalReducer
});

export default reducer;

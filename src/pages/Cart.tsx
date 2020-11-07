import { Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REPLACE_CART } from '../services/types';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

function amountgen(amount?: number) {
	if (!amount) {
		amount = 0;
	}

	amount = amount / 100;

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	return formatter.format(amount);
}

const Cart = () => {
	const cart = useSelector(
		(state: RootStateOrAny) => state.globalReducer.cart
	);

	const authenticated = useSelector(
		(state: RootStateOrAny) => state.globalReducer.authenticated
	);

	const dispatch = useDispatch();

	const history = useHistory();

	const calcTotal = () => {
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[i].product.price * cart[i].quantity;
		}

		return total;
	};

	const handleRemove = (id: number, e: any, cartItemId: string) => {
		e.stopPropagation();
		let newCart = cart.filter(
			(item: any) => item.cartItemId !== cartItemId
		);

		dispatch({ type: REPLACE_CART, payload: { cart: newCart } });
	};

	if (cart.length <= 0) {
		console.log('hello');
		return (
			<div className="cart">
				<div className="cart-top">
					<h1 style={{ textAlign: 'center' }}>Checkout</h1>
					<hr />
					<h3
						style={{
							marginTop: '25%',
							textTransform: 'uppercase',
							letterSpacing: '10px',
							color: 'gray'
						}}
					>
						No Products In Cart
					</h3>
				</div>
			</div>
		);
	}

	return (
		<MuiThemeProvider theme={theme}>
			<div className="cart">
				<div className="cart-top">
					<h1>Checkout</h1>
					<hr />
				</div>

				<div className="cart-details">
					<h3>Cart Summary - {cart.length}</h3>
					<hr style={{ marginBottom: '5%' }} />
					<div className="cart-items">
						{cart.map((item: any) => (
							<div
								className="cart-item"
								key={item.product.id}
								onClick={() =>
									history.push(
										`/shop/mice/${item.product.id}`
									)
								}
							>
								<img
									src={item.product.image}
									alt={item.product.name}
								/>
								<div>
									<p className="anchor-name">
										{item.product.name}
									</p>
									<p>{item.mouseSelection}</p>
								</div>
								<p>{item.quantity}</p>
								<p style={{ color: '#5CB85B' }}>
									{amountgen(item.product.price)}
								</p>
								<p
									className="remove"
									onClick={e =>
										handleRemove(
											item.product.id,
											e,
											item.cartItemId
										)
									}
								>
									X
								</p>
							</div>
						))}
					</div>
					<hr style={{ marginTop: '5%' }} />
				</div>
				<div className="cart-bottom">
					<p>Subtotal - {amountgen(calcTotal())}</p>
					<Button
						disabled={authenticated ? false : true}
						onClick={() => history.push('/cart/payment')}
						variant="outlined"
						style={{
							width: '100%',
							marginTop: '3%',
							color: '#5CB85B',
							opacity: authenticated ? 1.0 : 0.5
						}}
					>
						Payment Details
					</Button>
				</div>
			</div>
		</MuiThemeProvider>
	);
};

export default Cart;

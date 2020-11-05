import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

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

	const calcTotal = () => {
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[0].product.price * cart[0].quantity;
		}

		return total;
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
		<div className="cart">
			<div className="cart-top">
				<h1>Checkout</h1>
				<hr />
			</div>

			<div className="cart-details">
				<h3>Cart Summary</h3>
				<hr style={{ marginBottom: '5%' }} />
				{cart.map((item: any) => (
					<div className="cart-item" key={item.id}>
						<img src={item.product.image} alt={item.product.name} />
						<div>
							<p>{item.product.name}</p>
							<p>{item.mouseSelection}</p>
						</div>
						<p>{item.quantity}</p>
						<p style={{ color: '#5CB85B' }}>
							{amountgen(item.product.price)}
						</p>
						<p className="remove">X</p>
					</div>
				))}
				<hr style={{ marginTop: '5%' }} />
			</div>
			<div className="cart-bottom">
				Subtotal - {amountgen(calcTotal())}
			</div>
		</div>
	);
};

export default Cart;

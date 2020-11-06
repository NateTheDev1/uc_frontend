import { gql, useMutation } from '@apollo/client';
import {
	Button,
	createMuiTheme,
	IconButton,
	MuiThemeProvider,
	TextField
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import {
	CardElement,
	Elements,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';

import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const CREATE_ORDER = gql`
	mutation createOrder($order: OrderInput!) {
		createOrder(order: $order) {
			id
			valid
		}
	}
`;

const Payment = () => {
	const cart = useSelector(
		(state: RootStateOrAny) => state.globalReducer.cart
	);

	const [charge] = useMutation(CREATE_ORDER);

	const stripe = useStripe();
	const elements = useElements();

	const [formDetails, setFormDetails] = useState({
		zip: '',
		address: '',
		state: ''
	});

	const history = useHistory();

	const [verifyingPayment, setVerifying] = useState(false);
	const [paymentError, setPaymentError] = useState('');

	const calcTotal = () => {
		let total = 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[i].product.price * cart[i].quantity;
		}

		return total;
	};

	const handlePayment = async (e: any) => {
		e.preventDefault();

		const { error, paymentMethod }: any = await stripe?.createPaymentMethod(
			{
				type: 'card',
				card: elements?.getElement(CardElement)!
			}
		);

		if (!error) {
			setVerifying(true);

			const { id } = paymentMethod;

			const newCart = [];

			for (let i = 0; i < cart.length; i++) {
				newCart.push({
					name: cart[i].product.name,
					quantity: cart[i].quantity
				});
			}

			// Submit to backend
			const payment = {
				id,
				amount: calcTotal(),
				user: {
					email: 'nrichards@biggby.com',
					name: 'Nathaniel Richards',
					id: 1
				},
				cart: newCart,
				shipping: { ...formDetails },
				description: `Online Order for ${amountgen(calcTotal())}`
			};

			charge({ variables: { order: payment } })
				.then((res: any) => {
					history.push(`/confirm/${res.data.createOrder.id}`);
				})
				.catch((err: any) => {
					setPaymentError(err.message);
				});

			console.log(payment);

			setVerifying(false);
		}
	};

	return (
		<MuiThemeProvider theme={theme}>
			<div className="payment">
				<div className="payment-top">
					<IconButton onClick={() => history.goBack()}>
						<ArrowBack />
					</IconButton>
					<h1>Payment Details - {amountgen(calcTotal())}</h1>

					<hr />
					<p className="description">
						Please confirm your payment and shipping details are
						correct.
					</p>
				</div>

				<form
					className="checkout-form"
					onSubmit={e => handlePayment(e)}
				>
					<p>Shipping Address</p>
					<TextField
						variant="filled"
						value={formDetails.address}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								address: e.target.value
							})
						}
						required
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="text"
						placeholder="123213 S Lane Rd."
					/>
					<p>Zip Code</p>
					<TextField
						variant="filled"
						required
						value={formDetails.zip}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								zip: e.target.value
							})
						}
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="number"
						placeholder="90210"
					/>

					<p>State</p>
					<TextField
						variant="filled"
						required
						value={formDetails.state}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								state: e.target.value
							})
						}
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="text"
						placeholder="Michigan"
					/>
					<div className="card-details">
						<p>Card Details</p>
						<CardElement
							options={{
								style: {
									base: {
										fontWeight: 'lighter',
										fontSize: '1.2rem',
										color: 'black',
										iconColor: 'black',
										'::placeholder': {
											color: 'gray'
										}
									}
								}
							}}
						/>
					</div>
					<Button
						type="submit"
						variant="outlined"
						style={{
							marginTop: '3%',
							width: '100%',
							color: '#5CB85B'
						}}
					>
						Pay Now
					</Button>
					{paymentError.length > 0 && (
						<p style={{ color: 'red' }}>{paymentError}</p>
					)}
				</form>
			</div>
		</MuiThemeProvider>
	);
};

export default Payment;

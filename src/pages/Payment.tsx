import { gql, useMutation, useQuery } from '@apollo/client';
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

import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { REPLACE_CART, SET_ORDER } from '../services/types';

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

const GET_USER = gql`
	query getUser($id: ID!) {
		user(userId: $id) {
			name
			username
			id
		}
	}
`;

const Payment = () => {
	const cart = useSelector(
		(state: RootStateOrAny) => state.globalReducer.cart
	);

	const userId = useSelector(
		(state: RootStateOrAny) => state.globalReducer.userId
	);

	const [charge] = useMutation(CREATE_ORDER);
	const { loading, error, data } = useQuery(GET_USER, {
		variables: { id: userId }
	});

	const stripe = useStripe();
	const elements = useElements();

	const [formDetails, setFormDetails] = useState({
		zip: '',
		address: '',
		state: '',
		city: '',
		name: '',
		email: '',
		country: 'United States'
	});

	const history = useHistory();
	const dispatch = useDispatch();

	const [verifyingPayment, setVerifying] = useState(false);
	const [paymentError, setPaymentError] = useState('');

	const [canada, setCanada] = useState(false);

	useEffect(() => {
		if (formDetails.country.toLowerCase() === 'united states') {
			setCanada(false);
		} else {
			setCanada(true);
		}
	}, [formDetails.country]);

	const calcTotal = (additional?: number) => {
		let total = additional ? additional : 0;
		for (let i = 0; i < cart.length; i++) {
			total += cart[i].product.price * cart[i].quantity;
		}

		return total;
	};

	const handlePayment = async (e: any) => {
		e.preventDefault();

		const STRIPE_RES: any = await stripe?.createPaymentMethod({
			type: 'card',
			card: elements?.getElement(CardElement)!
		});

		if (!STRIPE_RES.error) {
			setVerifying(true);

			const { id } = STRIPE_RES.paymentMethod;

			const newCart = [];

			for (let i = 0; i < cart.length; i++) {
				newCart.push({
					name: cart[i].product.name,
					quantity: cart[i].quantity,
					mouse: cart[i].mouseSelection
				});
			}

			// Submit to backend
			const payment = {
				id,
				amount: calcTotal(),
				name: formDetails.name,
				email: formDetails.email,
				user: {
					email: data?.user.username,
					name: data?.user.name,
					id: userId.toString()
				},
				cart: newCart,
				shipping: {
					state: formDetails.state,
					country: formDetails.country,
					address: formDetails.address,
					zip: formDetails.zip,
					city: formDetails.city
				},
				description: `Online Order for ${amountgen(calcTotal())}`
			};

			charge({ variables: { order: payment } })
				.then((res: any) => {
					dispatch({ type: REPLACE_CART, payload: { cart: [] } });
					dispatch({
						type: SET_ORDER,
						payload: { orderId: res.data?.createOrder?.id }
					});
					setVerifying(false);
					history.push(`/confirm/${res.data.createOrder.id}`);
				})
				.catch((err: any) => {
					setVerifying(false);
					setPaymentError(err.message);
				});
		}
	};

	if (!userId) {
		return <Redirect to="/login" />;
	}

	return (
		<MuiThemeProvider theme={theme}>
			<div className="payment">
				<div className="payment-top">
					<IconButton onClick={() => history.goBack()}>
						<ArrowBack />
					</IconButton>
					<h1>
						Payment Details -{' '}
						{amountgen(calcTotal(canada ? 1000 : 0))}
					</h1>

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
					<p>City</p>
					<TextField
						variant="filled"
						required
						value={formDetails.city}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								city: e.target.value
							})
						}
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="text"
						placeholder="Grand Rapids"
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

					<p>Country</p>
					{canada && (
						<p
							style={{
								color: 'red',
								fontSize: '0.8rem'
							}}
						>
							10.00 Shipping Fee For International Shipping
						</p>
					)}
					<TextField
						variant="filled"
						required
						value={formDetails.country}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								country: e.target.value
							})
						}
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="text"
						placeholder="United States"
					/>

					<p>Name</p>
					<TextField
						variant="filled"
						required
						value={formDetails.name}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								name: e.target.value
							})
						}
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="text"
						placeholder="John Doe"
					/>

					<p>Email</p>
					<TextField
						variant="filled"
						required
						value={formDetails.email}
						onChange={(e: any) =>
							setFormDetails({
								...formDetails,
								email: e.target.value
							})
						}
						style={{
							width: '100%',
							color: 'black',
							marginBottom: '3%'
						}}
						type="email"
						placeholder="johndoe@email.com"
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
						disabled={verifyingPayment}
						type="submit"
						variant="outlined"
						style={{
							marginTop: '3%',
							width: '100%',
							color: '#5CB85B',
							opacity: verifyingPayment ? '0.3' : 1
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

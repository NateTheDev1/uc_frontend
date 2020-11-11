import { gql, useQuery } from '@apollo/client';
import {
	Button,
	CircularProgress,
	createMuiTheme,
	MenuItem,
	MuiThemeProvider,
	Select,
	TextField
} from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ADD_TO_CART, REPLACE_CART } from '../services/types';

import shortid from 'shortid';

const GET_PRODUCT = gql`
	query product($id: ID!) {
		product(id: $id) {
			id
			image
			name
			price
			description
		}
	}
`;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const supported = [
	'GLORIOUS Model O',
	'	GLORIOUS Model O-',
	'	GLORIOUS Model D',
	'	GLORIOUS Model D-',
	'	LOGITECH G203',
	'	LOGITECH G102',
	'	LOGITECH G Pro',
	'	LOGITECH G100s',
	'	LOGITECH G300s',
	'	LOGITECH G302',
	'	LOGITECH G303',
	'	LOGITECH G402',
	'	LOGITECH G403',
	'	LOGITECH G502',
	'	LOGITECH G400',
	'	LOGITECH G600',
	'	RAZER Deathadder',
	'	RAZER Deathadder Chroma',
	'	RAZER Deathadder Elite',
	'	RAZER Naga Chroma',
	'	RAZER Naga Trinity',
	'	RAZER Mamba TE',
	'	FINALMOUSE Air58',
	'	FINALMOUSE Ultralight',
	'	FINALMOUSE Ultralight Phantom',
	'	FINALMOUSE Scream One',
	'	FINALMOUSE Ultralight 2 Cape Town',
	'	ZOWIE Any Zowie model',
	'	G.WOLVES Skoll',
	'	G.WOLVES Hati',
	'	G.WOLVES Hati-S',
	'	G.WOLVES Skoll-S',
	'	STEELSERIES Sensei',
	'	STEELSERIES Rival 100',
	'	STEELSERIES Rival 106',
	'	STEELSERIES Rival 110',
	'	STEELSERIES Kana2',
	'	STEELSERIES Kinzu',
	'	STEELSERIES  Xai'
];

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

const ProductPage = () => {
	let params: any = useParams();
	const { loading, data, error } = useQuery(GET_PRODUCT, {
		variables: { id: params.id }
	});

	const cart = useSelector(
		(state: RootStateOrAny) => state.globalReducer.cart
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const [mouseSelection, setMouseSelection] = useState(supported[0]);
	const [quantity, setQuantity] = useState(1);

	if (loading) {
		return <CircularProgress />;
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const founditem = cart.find(
			(item: any) => item.product.id === params.id
		);

		if (!founditem) {
			dispatch({
				type: ADD_TO_CART,
				payload: {
					product: { ...data.product },
					quantity,
					mouseSelection,
					cartItemId: shortid()
				}
			});
		} else {
			let newCart: any = [];
			let mouseChanged = false;

			for (let i = 0; i < cart.length; i++) {
				if (cart[i].mouseSelection !== mouseSelection) {
					mouseChanged = true;
					break;
				}

				if (cart[i].product.id === data.product.id) {
					cart[i].quantity += quantity;
					newCart.push(cart[i]);
				} else {
					newCart.push(cart[i]);
				}
			}

			if (mouseChanged) {
				dispatch({
					type: ADD_TO_CART,
					payload: {
						product: { ...data.product },
						quantity,
						mouseSelection,
						cartItemId: shortid()
					}
				});
			} else {
				dispatch({ type: REPLACE_CART, payload: { cart: newCart } });
			}
		}

		history.goBack();
	};

	return (
		<MuiThemeProvider theme={theme}>
			<div className="product-page">
				<div className="details">
					<div className="product-details">
						<h1>{data.product.name}</h1>

						<p style={{ color: '#5CB85B', fontSize: '1.2rem' }}>
							{amountgen(data.product.price)}
						</p>

						<p>{data.product.description}</p>

						<form onSubmit={handleSubmit}>
							<p style={{ color: 'black' }}>Mouse Selection</p>
							<Select
								style={{ width: '100%' }}
								value={mouseSelection}
								onChange={e =>
									setMouseSelection(e.target.value as string)
								}
							>
								{supported.map((mouse: string) => (
									<MenuItem key={mouse} value={mouse}>
										{mouse}
									</MenuItem>
								))}
							</Select>

							<p>Quantity</p>
							<TextField
								type="number"
								required
								value={quantity}
								onChange={e =>
									setQuantity(parseInt(e.target.value))
								}
							/>
							<p>Color</p>
							<img
								src={data.product.image}
								alt={data.product.name}
							/>
							<Button
								type="submit"
								variant="outlined"
								style={{
									marginTop: '5%',
									marginBottom: '5%',
									width: '100%',
									background: '#BC67FF',
									color: 'white'
								}}
							>
								Add To Cart
							</Button>
						</form>
					</div>
				</div>
			</div>
		</MuiThemeProvider>
	);
};

export default ProductPage;

import { gql, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';

const ALL_PRODUCTS = gql`
	query {
		products(productGroupId: 1) {
			id
			name
			image
			price
		}
	}
`;

const GET_CONFIG = gql`
	query {
		getConfig {
			id
			value
			type
		}
	}
`;

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

const MiceShop = () => {
	const { loading, data, error } = useQuery(ALL_PRODUCTS);
	const configRes = useQuery(GET_CONFIG);

	const history = useHistory();

	if (loading || configRes.loading) {
		return (
			<div style={{ width: '80%', margin: '0 auto' }}>
				<CircularProgress style={{ margin: '0 auto' }} />
			</div>
		);
	}

	if (configRes.data.getConfig[0].value === 'ON') {
		return (
			<div className="mice-shop">
				<div className="mouse-shop-top">
					<h3
						style={{
							fontSize: '1.4rem',
							lineHeight: 2,
							textTransform: 'capitalize',
							color: 'red'
						}}
					>
						The Merchant Has Temporarily Disabled Online Ordering.
						Please Try Again Later
					</h3>
					<ErrorIcon
						style={{
							margin: '0 auto',
							color: 'red',
							fontSize: '2rem'
						}}
					/>
					<Link
						to="/"
						style={{
							marginTop: '5%',
							color: '#BC67FF',
							fontSize: '1.2rem',
							letterSpacing: '2px'
						}}
					>
						Go Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="mice-shop">
			<div className="mouse-shop-top">
				<h1>Mouse Cables</h1>
				<hr />
			</div>
			<div className="product-grid">
				{data.products.map((product: any) => (
					<div
						key={product.id}
						className="product-card"
						onClick={() => history.push(`/shop/mice/${product.id}`)}
					>
						<img src={product.image} alt={product.name} />
						<p>
							{product.name} - {amountgen(product.price)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default MiceShop;

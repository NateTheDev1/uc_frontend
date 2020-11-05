import { gql, useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

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

	const history = useHistory();

	if (loading) {
		return (
			<div style={{ width: '80%', margin: '0 auto' }}>
				<CircularProgress style={{ margin: '0 auto' }} />
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

import { Chip, Paper } from '@material-ui/core';

import React from 'react';
import FadeIn from 'react-fade-in';
import EditProductForm from './EditProductForm';

interface ProductViewProps {
	id: number;
	name: string;
	price: number;
	image: string;
	enabled: boolean;
	description: string;
}

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

const AdminProductView = ({ product }: { product: ProductViewProps }) => {
	return (
		<Paper
			className="product-action-view"
			elevation={4}
			style={{ padding: '2%', marginBottom: '10%' }}
		>
			<div className="top">
				<img
					src={product.image}
					alt={product.name}
					style={{ borderRadius: '35px' }}
				/>
				<FadeIn>
					<h1>{product.name}</h1>
					<Chip
						style={{
							width: '150px',
							color: 'white',
							background: product.enabled ? '#5CB85B' : '#CD2B2F'
						}}
						size="medium"
						label={product.enabled === true ? 'Active' : 'Disabled'}
					/>
					<p style={{ color: '#5CB85B' }}>
						{amountgen(product.price)}
					</p>
					<p>{product.description}</p>
				</FadeIn>
			</div>
			<EditProductForm product={product} />
		</Paper>
	);
};

export default AdminProductView;

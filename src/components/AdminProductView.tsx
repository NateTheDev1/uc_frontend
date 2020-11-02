import React from 'react';

interface ProductViewProps {
	id: number;
	name: string;
	price: number;
	image: string;
	enabled: boolean;
	description: string;
}

const AdminProductView = ({ product }: { product: ProductViewProps }) => {
	return (
		<div className="product-action-view">
			<p>{product.name}</p>
		</div>
	);
};

export default AdminProductView;

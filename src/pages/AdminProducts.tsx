import {
	Button,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import React, { useState } from 'react';
import AdminProductView from '../components/AdminProductView';

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

const testProducts = [
	{
		id: 1,
		name: 'Example Cable 1',
		price: 2199,
		image:
			'https://res.cloudinary.com/untangled-cables/image/upload/v1604356615/Chill_etto0q.jpg',
		enabled: true,
		description:
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, quas neque! Quidem deserunt libero quod, cumque architecto voluptatibus sint dolor?'
	},
	{
		id: 2,
		name: 'Example Cable 2',
		price: 2499,
		image:
			'https://res.cloudinary.com/untangled-cables/image/upload/v1604356615/Chill_etto0q.jpg',
		enabled: true,
		description:
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, quas neque! Quidem deserunt libero quod, cumque architecto voluptatibus sint dolor?'
	},
	{
		id: 3,
		name: 'Example Cable 3',
		price: 1899,
		image:
			'https://res.cloudinary.com/untangled-cables/image/upload/v1604356615/Chill_etto0q.jpg',
		enabled: false,
		description:
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, quas neque! Quidem deserunt libero quod, cumque architecto voluptatibus sint dolor?'
	}
];

const AdminProducts = () => {
	const [selectedProduct, setSelectedProduct] = useState<null | any>(null);
	const [adding, setAdding] = useState(false);

	const handleSelectProduct = (id: number) => {
		const product = testProducts.filter(product => product.id === id);
		setSelectedProduct(product);
	};

	return (
		<div className="admin-products">
			<h4>Product Management</h4>
			<hr />

			<Button
				size="small"
				variant="outlined"
				style={{ color: '#5CB85B' }}
				onClick={() => setAdding(true)}
			>
				Add Product
			</Button>

			<div className="product-tables">
				<h5>Active Products</h5>
				<p>A list of the currently active products</p>
			</div>
			<p>
				{testProducts.length} Current{' '}
				{testProducts.length === 1 ? 'Product' : 'Products'}
			</p>
			<TableContainer component={Paper}>
				<Table aria-label="admin users">
					<TableHead>
						<TableRow>
							<TableCell>id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Enabled?</TableCell>
						</TableRow>
					</TableHead>
					{testProducts.map((product: any) => (
						<TableRow
							className="product-selection"
							key={product.id}
							style={{
								border:
									selectedProduct &&
									selectedProduct[0].id === product.id
										? '1px solid black'
										: 'none'
							}}
							onClick={() => handleSelectProduct(product.id)}
						>
							<TableCell>{product.id}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>{amountgen(product.price)}</TableCell>
							<TableCell>{product.enabled.toString()}</TableCell>
						</TableRow>
					))}
				</Table>
			</TableContainer>

			{adding === true && <p>adding a product todo...</p>}

			{selectedProduct === null && adding === false ? (
				<h3
					style={{
						textAlign: 'center',
						marginTop: '75px',
						color: 'gray',
						fontSize: '1rem'
					}}
				>
					No Selected Product. Make A Selection For Product Actions
				</h3>
			) : (
				selectedProduct !== null &&
				!adding && <AdminProductView product={selectedProduct[0]} />
			)}
		</div>
	);
};

export default AdminProducts;

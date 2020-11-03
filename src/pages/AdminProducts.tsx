import { gql, useQuery } from '@apollo/client';
import {
	Button,
	CircularProgress,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import AddProductForm from '../components/AddProductForm';
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

const GET_PRODUCTS = gql`
	query {
		allProducts {
			id
			name
			price
			image
			enabled
			description
		}
	}
`;

const AdminProducts = () => {
	const [selectedProduct, setSelectedProduct] = useState<null | any>(null);
	const [products, setProducts] = useState<any>([]);
	const [adding, setAdding] = useState(false);

	const { loading, error, data } = useQuery(GET_PRODUCTS);

	useEffect(() => {
		if (!loading && data) {
			setProducts(data.allProducts);
		}
	}, [data, loading]);

	const handleSelectProduct = (id: number) => {
		const product = products.filter((product: any) => product.id === id);
		setAdding(false);
		setSelectedProduct(product);
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<div
			className="admin-products"
			style={{ marginBottom: '5%', height: '80%' }}
		>
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
				{products.length} Current{' '}
				{products.length === 1 ? 'Product' : 'Products'}
			</p>
			<TableContainer
				component={Paper}
				style={{ minHeight: '30%', width: '100%' }}
			>
				<Table aria-label="admin users">
					<TableHead>
						<TableRow>
							<TableCell>id</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Enabled</TableCell>
						</TableRow>
					</TableHead>
					{products.map((product: any) => (
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
							<TableCell>{product.enabled}</TableCell>
						</TableRow>
					))}
				</Table>
			</TableContainer>

			{adding === true && <AddProductForm />}

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
				!adding && (
					<div>
						<AdminProductView product={selectedProduct[0]} />
					</div>
				)
			)}
		</div>
	);
};

export default AdminProducts;

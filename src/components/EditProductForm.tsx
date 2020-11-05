import { gql, useMutation } from '@apollo/client';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	createMuiTheme,
	MuiThemeProvider,
	Switch,
	TextField
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FormEvent, useEffect, useState } from 'react';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const EDIT_PRODUCT = gql`
	mutation editProduct($product: EditProductInput!) {
		editProduct(product: $product) {
			id
		}
	}
`;

const EditProductForm = ({ product }: { product: any }) => {
	console.log(product.image);
	const [formDetails, setFormDetails] = useState({
		name: product.name || '',
		price: product.price.toString() || '',
		description: product.description || '',
		enabled: product.enabled === 'TRUE' ? true : false,
		image: product.image || ''
	});

	const [editProduct, { data }] = useMutation(EDIT_PRODUCT);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setFormDetails({
			name: product.name || '',
			price: product.price.toString() || '',
			description: product.description || '',
			enabled: product.enabled === 'TRUE' ? true : false,
			image: product.image || ''
		});
	}, [product]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		editProduct({
			variables: {
				product: {
					...formDetails,
					id: product.id,
					enabled: formDetails.enabled === true ? 'TRUE' : 'FALSE',
					price: parseInt(formDetails.price.replace('.', '')),
					image: formDetails.image
				}
			}
		})
			.then(res => {
				setLoading(false);
				window.location.reload();
			})
			.catch(err => {
				setLoading(false);
			});
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<MuiThemeProvider theme={theme}>
			<Accordion style={{ marginTop: '3%' }}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="edit-user"
					id="edit-user"
				>
					<h5>Edit Product Details</h5>
				</AccordionSummary>
				<AccordionDetails>
					<form style={{ width: '100%' }} onSubmit={handleSubmit}>
						<p>Product Name</p>
						<TextField
							required
							style={{
								width: '80%',
								color: 'black',
								marginBottom: '3%'
							}}
							type="text"
							onChange={e =>
								setFormDetails({
									...formDetails,
									name: e.target.value
								})
							}
							value={formDetails.name}
							placeholder="Product Name"
						/>
						<p>Product Image</p>
						<TextField
							required
							style={{
								width: '80%',
								color: 'black',
								marginBottom: '3%'
							}}
							type="text"
							onChange={e =>
								setFormDetails({
									...formDetails,
									image: e.target.value
								})
							}
							value={formDetails.image}
							placeholder="https://google.com/sdasdsa.jpg"
						/>
						<p>Product Price</p>
						<TextField
							required
							style={{
								width: '80%',
								color: 'black',
								marginBottom: '3%'
							}}
							type="number"
							value={formDetails.price}
							onChange={e =>
								setFormDetails({
									...formDetails,
									price: e.target.value
								})
							}
							placeholder="Product Price"
						/>
						<p>Product Description</p>
						<TextField
							required
							variant="filled"
							multiline
							rows={4}
							style={{
								width: '80%',
								color: 'black',
								marginBottom: '3%'
							}}
							value={formDetails.description}
							onChange={e =>
								setFormDetails({
									...formDetails,
									description: e.target.value
								})
							}
							placeholder="Product Description"
						/>
						<p>Active</p>
						<Switch
							name="Product Active"
							color="primary"
							style={{ margin: 0 }}
							checked={formDetails.enabled}
							onChange={() =>
								setFormDetails({
									...formDetails,
									enabled: !formDetails.enabled
								})
							}
						/>
						<br />
						<Button
							size="small"
							variant="outlined"
							style={{
								color: '#5CB85B',
								marginTop: '2%',
								width: '30%'
							}}
							type="submit"
						>
							Save
						</Button>
					</form>
				</AccordionDetails>
			</Accordion>
		</MuiThemeProvider>
	);
};

export default EditProductForm;

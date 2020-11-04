import { gql, useMutation } from '@apollo/client';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	createMuiTheme,
	MenuItem,
	MuiThemeProvider,
	Select,
	Switch,
	TextField
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FormEvent, useState } from 'react';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const ADD_PRODUCT = gql`
	mutation createProduct($product: ProductInput!) {
		createProduct(product: $product) {
			id
		}
	}
`;

const AddProductForm = () => {
	const [formDetails, setFormDetails] = useState({
		name: '',
		image: '',
		price: '',
		description: '',
		enabled: true,
		productGroupId: 1
	});
	const [loading, setLoading] = useState(false);

	const [createProduct, { data }] = useMutation(ADD_PRODUCT);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		createProduct({
			variables: {
				product: {
					...formDetails,
					enabled: formDetails.enabled === true ? 'TRUE' : 'FALSE',
					price: parseInt(formDetails.price.replace('.', ''))
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
			<Accordion style={{ marginTop: '3%', marginBottom: '5%' }}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="edit-user"
					id="edit-user"
				>
					<h5>
						{formDetails.name.length < 1
							? 'New Product'
							: formDetails.name}
					</h5>
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
						<p>Product Group</p>
						<Select
							style={{ width: '40%', marginBottom: '3%' }}
							value={formDetails.productGroupId}
							onChange={e =>
								setFormDetails({
									...formDetails,
									productGroupId: e.target.value as number
								})
							}
						>
							<MenuItem value={1}>Mouse Cables</MenuItem>
							<MenuItem value={11}>Keyboard Cables</MenuItem>
						</Select>
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
							Create
						</Button>
					</form>
				</AccordionDetails>
			</Accordion>
		</MuiThemeProvider>
	);
};

export default AddProductForm;

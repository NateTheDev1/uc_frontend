import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	createMuiTheme,
	MuiThemeProvider,
	Switch,
	TextField
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const EditProductForm = ({ product }: { product: any }) => {
	const [formDetails, setFormDetails] = useState({
		name: product.name || '',
		price: product.price || 0.0,
		description: product.description || '',
		enabled: product.enabled
	});

	useEffect(() => {
		setFormDetails({
			name: product.name || '',
			price: product.price || 0.0,
			description: product.description || '',
			enabled: product.enabled
		});
	}, [product]);

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
					<form style={{ width: '100%' }}>
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
					</form>
				</AccordionDetails>
			</Accordion>
		</MuiThemeProvider>
	);
};

export default EditProductForm;

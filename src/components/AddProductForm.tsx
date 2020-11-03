import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	createMuiTheme,
	MuiThemeProvider,
	Switch,
	TextField
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const AddProductForm = () => {
	const [formDetails, setFormDetails] = useState({
		name: '',
		price: '',
		description: '',
		enabled: false,
		productGroup: 'MOUSE_CABLES'
	});

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

import { gql, useMutation } from '@apollo/client';
import {
	Accordion,
	AccordionActions,
	AccordionDetails,
	AccordionSummary,
	Button,
	createMuiTheme,
	Divider,
	MuiThemeProvider,
	TextField
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FormEvent, useState } from 'react';
import SignUp from '../pages/Onboarding/SignUp';

const SIGNUP = gql`
	mutation createUser($user: CreateUserInput!) {
		createUser(user: $user) {
			id
		}
	}
`;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const AdminUserForm = () => {
	const [formDetails, setFormDetails] = useState<{
		username: string;
		password: string;
		name: string;
	}>({
		username: '',
		password: '',
		name: ''
	});

	const [loginUser, { data }] = useMutation(SIGNUP);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		loginUser({
			variables: { user: { ...formDetails, type: 'ADMIN' } }
		})
			.then(res => {
				setLoading(false);
				window.location.reload();
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			});
	};

	return (
		<div className="admin-form">
			<MuiThemeProvider theme={theme}>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMore />}
						aria-controls="create-user-panel"
						id="create-user"
					>
						<h4>Create Admin User</h4>
					</AccordionSummary>
					<AccordionDetails>
						{!loading && (
							<form
								autoComplete="off"
								className="create-form"
								onSubmit={handleSubmit}
							>
								<TextField
									required
									style={{
										color: 'black',
										marginBottom: '3%'
									}}
									type="text"
									value={formDetails.username}
									onChange={e =>
										setFormDetails({
											...formDetails,
											username: e.target.value
										})
									}
									placeholder="Email"
								/>
								<TextField
									required
									style={{
										color: 'black',
										marginBottom: '3%'
									}}
									type="text"
									value={formDetails.name}
									onChange={e =>
										setFormDetails({
											...formDetails,
											name: e.target.value
										})
									}
									placeholder="Name"
								/>
								<TextField
									required
									style={{
										color: 'black',
										marginBottom: '3%'
									}}
									type="password"
									value={formDetails.password}
									onChange={e =>
										setFormDetails({
											...formDetails,
											password: e.target.value
										})
									}
									placeholder="Password"
								/>
							</form>
						)}
					</AccordionDetails>
					<Divider style={{ width: '100%' }} />
					<AccordionActions>
						<Button
							size="small"
							style={{ color: '#5CB85B' }}
							type="submit"
							onClick={e => handleSubmit(e as any)}
						>
							Create
						</Button>
					</AccordionActions>
				</Accordion>
			</MuiThemeProvider>
		</div>
	);
};

export default AdminUserForm;

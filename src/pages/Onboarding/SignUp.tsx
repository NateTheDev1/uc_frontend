import React, { FormEvent, useState } from 'react';
import FaceIcon from '@material-ui/icons/Face';
import {
	Button,
	createMuiTheme,
	LinearProgress,
	MuiThemeProvider,
	TextField
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { RootStateOrAny, useSelector } from 'react-redux';

import { Link, Redirect, useHistory } from 'react-router-dom';

const SIGNUP = gql`
	mutation createUser($user: CreateUserInput!) {
		createUser(user: $user) {
			id
		}
	}
`;

const SignUp = () => {
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
	const history = useHistory();

	const authenticated = useSelector(
		(state: RootStateOrAny) => state.globalReducer.authenticated
	);

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#BC67FF'
			}
		}
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setLoading(true);
		loginUser({
			variables: { user: { ...formDetails, type: 'CUSTOMER' } }
		})
			.then(res => {
				setLoading(false);
				history.push('/login');
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			});
	};

	if (authenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="login-root">
			<MuiThemeProvider theme={theme}>
				<div className="login-top">
					<FaceIcon
						style={{ marginBottom: '2%', fontSize: '3rem' }}
					/>
					<h1>Signup</h1>
					<hr />
					<p
						style={{
							textTransform: 'none'
						}}
					>
						Already't have an account? Login Up{' '}
						<Link to="/login" style={{ color: '#BC67FF' }}>
							Here
						</Link>
					</p>
					{error.length > 1 && (
						<p
							className="input-error"
							style={{ marginTop: '3%', color: 'red' }}
						>
							{error}
						</p>
					)}
				</div>
				<form
					autoComplete="off"
					className="login-form"
					onSubmit={handleSubmit}
				>
					<TextField
						required
						style={{ color: 'black', marginBottom: '8%' }}
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
						style={{ color: 'black', marginBottom: '8%' }}
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
						style={{ color: 'black', marginBottom: '10%' }}
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

					<Button
						color="primary"
						variant="outlined"
						type="submit"
						disabled={loading}
					>
						Get Started
					</Button>
					{loading && <LinearProgress color="primary" />}
				</form>
			</MuiThemeProvider>
		</div>
	);
};

export default SignUp;

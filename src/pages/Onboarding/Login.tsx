import React, { useState } from 'react';
import FaceIcon from '@material-ui/icons/Face';
import {
	Button,
	createMuiTheme,
	MuiThemeProvider,
	TextField
} from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { LOGIN_OK } from '../../services/types';
import { Redirect } from 'react-router-dom';

const LOGIN = gql`
	mutation loginUser($credentials: LoginUserInput!) {
		loginUser(credentials: $credentials) {
			token
		}
	}
`;

const Login = () => {
	const [formDetails, setFormDetails] = useState<{
		username: string;
		password: string;
	}>({
		username: '',
		password: ''
	});

	const [loginUser, { data }] = useMutation(LOGIN);
	const [error, setError] = useState('');
	const dispatch = useDispatch();

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

	const handleSubmit = e => {
		e.preventDefault();
		setError('');
		loginUser({ variables: { credentials: formDetails } })
			.then(res => {
				console.log(res.data?.loginUser);
				localStorage.setItem('uc_token', res.data?.loginUser.token);
				dispatch({ type: LOGIN_OK, payload: res.data?.loginUser });
			})
			.catch(err => {
				setError(err.message);
			});
	};

	if (authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-root">
			<MuiThemeProvider theme={theme}>
				<div className="login-top">
					<FaceIcon
						style={{ marginBottom: '2%', fontSize: '3rem' }}
					/>
					<h1>Login</h1>
					<hr />
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
						placeholder="Username"
					/>
					<TextField
						required
						style={{ color: 'black', marginBottom: '10%' }}
						type="password"
						value={formDetails.passwords}
						onChange={e =>
							setFormDetails({
								...formDetails,
								password: e.target.value
							})
						}
						placeholder="Password"
					/>

					<Button color="primary" variant="outlined" type="submit">
						Submit
					</Button>
				</form>
			</MuiThemeProvider>
		</div>
	);
};

export default Login;

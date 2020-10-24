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
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { LOGIN_OK } from '../../services/types';
import { Link, Redirect, useHistory } from 'react-router-dom';

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
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
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
		loginUser({ variables: { credentials: formDetails } })
			.then(res => {
				setLoading(false);
				localStorage.setItem('uc_token', res.data?.loginUser.token);
				dispatch({ type: LOGIN_OK, payload: res.data?.loginUser });
				history.push('/');
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
					<h1>Login</h1>
					<hr />
					<p
						style={{
							textTransform: 'none'
						}}
					>
						Don't have an account? Sign Up{' '}
						<Link to="/signup" style={{ color: '#BC67FF' }}>
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

					<Button color="primary" variant="outlined" type="submit">
						Submit
					</Button>
					{loading && <LinearProgress color="primary" />}
				</form>
			</MuiThemeProvider>
		</div>
	);
};

export default Login;

import {
	AppBar,
	Badge,
	CircularProgress,
	IconButton,
	Toolbar
} from '@material-ui/core';

import React, { useState, useEffect } from 'react';

// import logo from '../logo.png';
import { AccountCircle, ShoppingCartSharp } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LOGOUT } from '../services/types';
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
	query getUser($id: ID!) {
		user(userId: $id) {
			type
		}
	}
`;

const Navbar = () => {
	const location = useLocation();
	const history = useHistory();
	const [page, setPage] = useState('');

	const userId = useSelector(
		(state: RootStateOrAny) => state.globalReducer.userId
	);

	const getUser = useQuery(GET_USER, { variables: { id: userId } });

	const dispatch = useDispatch();
	const cart = useSelector(
		(state: RootStateOrAny) => state.globalReducer.cart
	);

	const [dropDownOpen, setDropDownOpen] = useState(false);

	useEffect(() => {
		setPage(location.pathname);
	}, [location]);

	const authenticated = useSelector(
		(state: RootStateOrAny) => state.globalReducer.authenticated
	);

	const handleLogout = () => {
		localStorage.removeItem('uc_token');
		localStorage.removeItem('uc_userId');
		localStorage.removeItem('uc_userType');
		dispatch({ type: LOGOUT });
		window.location.reload();
	};

	if (getUser.loading) {
		return <CircularProgress />;
	}

	return (
		<AppBar elevation={0} position="static" className="navbar-root">
			<Toolbar className="navbar">
				<div className="nav-left">
					{/* <img src={logo} alt="Untangled cables" className="logo" /> */}
					<h4>UNTANGLED CABLES</h4>
				</div>
				<div className="nav-right">
					<Link
						to="/"
						style={{ color: page === '/' ? '#BB67FF' : '#8F8F8F' }}
					>
						Home
					</Link>
					<Link
						to="/faq"
						style={{
							color: page === '/faq' ? '#BB67FF' : '#8F8F8F'
						}}
					>
						FAQ
					</Link>

					{/* <Link
						to="/contact"
						style={{
							color: page === '/contact' ? '#BB67FF' : '#8F8F8F'
						}}
					>
						Contact
					</Link> */}

					<Link
						to="/shop"
						onMouseOver={() => setDropDownOpen(true)}
						onMouseLeave={() => setDropDownOpen(false)}
						style={{
							color: page === '/shop' ? '#BB67FF' : '#8F8F8F'
						}}
					>
						Shop
						{dropDownOpen && (
							<div
								onMouseEnter={() => setDropDownOpen(true)}
								style={{
									width: '100px',

									height: '200px',
									paddingLeft: '10px',

									position: 'fixed',
									background: 'rgba(255,255,255, 0.2)',
									transition: '0.5s'
								}}
							>
								<Link
									to="/shop/mice"
									style={{
										color:
											page.includes('/shop') &&
											page.includes('/mice')
												? '#BB67FF'
												: '#8F8F8F'
									}}
									className="dropdown-link"
								>
									<br />
									Mouse Cables
								</Link>
							</div>
						)}
					</Link>

					{getUser && getUser.data?.user.type === 'ADMIN' ? (
						<IconButton
							color="inherit"
							onClick={() =>
								authenticated
									? history.push('/dashboard')
									: history.push('/login')
							}
						>
							<AccountCircle
								style={{
									color:
										page === '/login' ||
										page === '/account' ||
										page === '/signup'
											? '#BB67FF'
											: 'black'
								}}
								className="nav-icon"
							/>
						</IconButton>
					) : (
						getUser.data?.user.type === 'ADMIN' ||
						(!authenticated && (
							<IconButton
								color="inherit"
								onClick={() => history.push('/login')}
							>
								<AccountCircle
									style={{
										color:
											page === '/login' ||
											page === '/account' ||
											page === '/signup'
												? '#BB67FF'
												: 'black'
									}}
									className="nav-icon"
								/>
							</IconButton>
						))
					)}

					<IconButton
						color="inherit"
						onClick={() => history.push('/cart')}
					>
						<Badge
							badgeContent={cart.length}
							style={{
								color: page === '/' ? '#8F8F8F' : 'black'
							}}
						>
							<ShoppingCartSharp
								className="nav-icon"
								style={{
									color: '#BB67FF'
								}}
							/>
						</Badge>
					</IconButton>

					{authenticated && (
						<IconButton color="inherit" onClick={handleLogout}>
							<ExitToAppIcon
								style={{ color: 'black' }}
								className="nav-icon exit-icon"
							/>
						</IconButton>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

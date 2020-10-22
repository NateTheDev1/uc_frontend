import { AppBar, IconButton, Toolbar } from '@material-ui/core';

import React, { useState, useEffect } from 'react';

// import logo from '../logo.png';
import { AccountCircle } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
	const location = useLocation();
	const [page, setPage] = useState('');

	useEffect(() => {
		setPage(location.pathname);
	}, [location]);

	return (
		<AppBar elevation={3} position="static" className="navbar-root">
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
						to="/contact"
						style={{
							color: page === '/contact' ? '#BB67FF' : '#8F8F8F'
						}}
					>
						Contact
					</Link>

					<Link
						to="/shop"
						style={{
							color: page === '/shop' ? '#BB67FF' : '#8F8F8F'
						}}
					>
						Shop (3)
					</Link>

					<IconButton color="inherit">
						<AccountCircle
							style={{
								color:
									page === '/login' ||
									page === '/account' ||
									page === '/signup'
										? '#BB67FF'
										: 'white'
							}}
							className="nav-icon"
						/>
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

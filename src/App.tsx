/// <reference path="./modules.d.ts" />
import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { PageTransition } from '@steveeeie/react-page-transition';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import Shop from './pages/Shop';
import MiceShop from './pages/Mice';
import Login from './pages/Onboarding/Login';
import SignUp from './pages/Onboarding/SignUp';

import { ShoppingCart } from '@material-ui/icons';

const App = () => {
	const [page, setPage] = useState('');

	return (
		<Router>
			<div
				className={page === '/' ? 'bg-class' : ''}
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
					flexDirection: 'column'
				}}
			>
				<Navbar />
				<Route
					render={({ location }) => {
						setPage(location.pathname);
						return (
							<PageTransition
								preset="scaleUpScaleUp"
								transitionKey={location.pathname}
							>
								<Switch location={location}>
									<Route
										exact
										path="/shop"
										component={() => <Shop />}
									/>
									<Route
										exact
										path="/login"
										component={() => <Login />}
									/>
									<Route
										exact
										path="/signup"
										component={() => <SignUp />}
									/>
									<Route
										exact
										path="/shop/mice"
										component={() => <MiceShop />}
									/>
									<Route
										path="/"
										component={() => <Home />}
									/>
								</Switch>
							</PageTransition>
						);
					}}
				/>

				<p
					style={{
						textAlign: 'center',
						textTransform: 'uppercase',
						letterSpacing: '3px',
						color: '#8F8F8F',
						fontSize: '0.8rem'
					}}
				>
					Untangled Cables 2020
				</p>
			</div>
		</Router>
	);
};

export default App;

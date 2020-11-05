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
import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './components/ProductPage';
import Cart from './pages/Cart';

const App = () => {
	const [page, setPage] = useState('');

	return (
		<Router>
			<div
				className={page === '/' ? 'bg-class' : ''}
				style={{
					width: '100%',
					height: '100%',
					margin: 0,
					padding: 0
				}}
			>
				<Route
					render={({ location }) => {
						setPage(location.pathname);
						return (
							<PageTransition
								preset="scaleUpScaleUp"
								transitionKey={location.pathname}
							>
								<Switch location={location}>
									<Route exact path="/shop">
										<Navbar /> <Shop />
									</Route>
									<Route exact path="/login">
										<Navbar />
										<Login />
									</Route>
									<Route exact path="/signup">
										<Navbar />
										<SignUp />
									</Route>
									<Route exact path="/shop/mice">
										<Navbar />
										<MiceShop />
									</Route>
									<Route exact path="/shop/mice/:id">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<ProductPage />
										</div>
									</Route>
									<Route exact path="/dashboard">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<AdminDashboard />
										</div>
									</Route>

									<Route exact path="/cart">
										<Navbar />
										<Cart />
									</Route>

									<Route path="/">
										<Navbar />
										<Home />
									</Route>
								</Switch>
							</PageTransition>
						);
					}}
				/>
				{page !== '/' && (
					<p
						style={{
							textAlign: 'center',
							textTransform: 'uppercase',
							marginBottom: '3%',
							letterSpacing: '3px',
							color: '#8F8F8F',
							fontSize: '0.8rem'
						}}
					>
						Untangled Cables 2020
					</p>
				)}
			</div>
		</Router>
	);
};

export default App;

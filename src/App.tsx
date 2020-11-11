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

import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './components/ProductPage';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import OrderConfirmation from './pages/OrderConfirmation';

const stripePromise: any = loadStripe(
	process.env.REACT_APP_PUBLISHABLE_STRIPE_KEY!
);

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
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar /> <Shop />
										</div>
									</Route>
									<Route exact path="/login">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<Login />
										</div>
									</Route>
									<Route exact path="/signup">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<SignUp />
										</div>
									</Route>
									<Route exact path="/shop/mice">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<MiceShop />
										</div>
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
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<Cart />
										</div>
									</Route>

									<Route exact path="/cart/payment">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<Elements stripe={stripePromise}>
												<Payment />
											</Elements>
										</div>
									</Route>

									<Route exact path="/confirm/:id">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<OrderConfirmation />
										</div>
									</Route>

									<Route path="/">
										<div
											style={{
												height: '100%',
												overflow: 'scroll'
											}}
										>
											<Navbar />
											<Home />
										</div>
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

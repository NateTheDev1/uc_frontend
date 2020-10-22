import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import BG from './background.jpg';

const App = () => {
	return (
		<Router>
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
					flexDirection: 'column',

					background: ` linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BG})`,

					backgroundPosition: 'center',
					backgroundRepeat: ' no-repeat',
					backgroundSize: 'cover'
				}}
			>
				<Navbar />
				<Route
					render={({ location }) => {
						return (
							<PageTransition
								preset="scaleUpScaleUp"
								transitionKey={location.pathname}
							>
								<Switch location={location}>
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

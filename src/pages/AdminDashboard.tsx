import { createMuiTheme, MuiThemeProvider, Switch } from '@material-ui/core';
import React from 'react';
import FadeIn from 'react-fade-in';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const AdminDashboard = () => {
	const authenticated = useSelector(
		(state: RootStateOrAny) => state.globalReducer.authenticated
	);

	if (!authenticated) {
		return <Redirect to="/login" />;
	}
	return (
		<div className="admin-dashboard">
			<div className="admin-top">
				<h1>Dashboard</h1>
				<hr />
			</div>
			<MuiThemeProvider theme={theme}>
				<FadeIn delay={150} className="admin-set">
					<h4>Store Settings</h4>
					<FadeIn className="settings-container" delay={50}>
						<div className="setting">
							<h5>Pause Online Ordering</h5>
							<p>
								Will turn off the ability for users to place
								orders.
							</p>
							<Switch name="Disable Orders" color="primary" />
						</div>

						<div className="setting">
							<h5></h5>
							<p>
								Will turn off the ability for users to place
								orders.
							</p>
							<Switch name="Disable Orders" color="primary" />
						</div>
					</FadeIn>
				</FadeIn>
			</MuiThemeProvider>
		</div>
	);
};

export default AdminDashboard;

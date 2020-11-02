import { gql, useMutation, useQuery } from '@apollo/client';
import {
	CircularProgress,
	createMuiTheme,
	MuiThemeProvider,
	Switch
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Admin from './Admin';
import AdminProducts from './AdminProducts';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#BC67FF'
		}
	}
});

const EDIT_SETTING = gql`
	mutation($config: ConfigInput!) {
		editConfig(config: $config)
	}
`;

const GET_CONFIG = gql`
	query {
		getConfig {
			id
			value
			type
		}
	}
`;

const AdminDashboard = () => {
	const [editConfig] = useMutation(EDIT_SETTING);
	const [saving, setSaving] = useState(false);
	const { loading, error, data } = useQuery(GET_CONFIG);
	const [activeArea, setActiveArea] = useState('HOME');

	const [settingsValue, setSettingsValue] = useState({
		orders: false,
		discount: false,
		shipping: false
	});

	useEffect(() => {
		if (!loading && data) {
			console.log(data.getConfig[1]);
			setSettingsValue({
				...settingsValue,
				orders: data.getConfig[0].value === 'ON' ? true : false,
				discount: data.getConfig[1].value === 'ON' ? true : false,
				shipping: data.getConfig[2].value === 'ON' ? true : false
			});
		}
	}, [data, loading]);

	const authenticated = useSelector(
		(state: RootStateOrAny) => state.globalReducer.authenticated
	);

	if (!authenticated) {
		return <Redirect to="/login" />;
	}

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return (
			<p style={{ color: 'red' }}>
				Error fetching configuration settings
			</p>
		);
	}

	const onConfig = (config: string) => {
		if (config === 'orders') {
			setSettingsValue({
				...settingsValue,
				orders: !settingsValue.orders
			});
			setSaving(true);
			editConfig({
				variables: {
					config: {
						id: parseInt(data.getConfig[0].id),
						value: settingsValue.orders === true ? 'OFF' : 'ON'
					}
				}
			}).then(() => setSaving(false));
		}

		if (config === 'discount') {
			setSettingsValue({
				...settingsValue,
				discount: !settingsValue.discount
			});
			setSaving(true);
			editConfig({
				variables: {
					config: {
						id: parseInt(data.getConfig[1].id),
						value: settingsValue.discount === true ? 'OFF' : 'ON'
					}
				}
			}).then(() => setSaving(false));
		}

		if (config === 'shipping') {
			setSettingsValue({
				...settingsValue,
				shipping: !settingsValue.shipping
			});
			setSaving(true);
			editConfig({
				variables: {
					config: {
						id: parseInt(data.getConfig[2].id),
						value: settingsValue.shipping === true ? 'OFF' : 'ON'
					}
				}
			}).then(() => setSaving(false));
		}
	};

	return (
		<div className="admin-dashboard">
			<div className="admin-top">
				<h1>Dashboard</h1>
				<hr />
			</div>

			<div className="settings-nav">
				<p
					onClick={() => setActiveArea('HOME')}
					style={{
						textDecoration:
							activeArea === 'HOME' ? 'underline' : 'none'
					}}
				>
					Home
				</p>
				<p
					onClick={() => setActiveArea('PRODUCTS')}
					style={{
						textDecoration:
							activeArea === 'PRODUCTS' ? 'underline' : 'none'
					}}
				>
					Product Management
				</p>
			</div>

			{activeArea === 'PRODUCTS' && <AdminProducts />}

			{activeArea === 'HOME' && (
				<MuiThemeProvider theme={theme}>
					<FadeIn delay={150} className="admin-set">
						<h4>Store Settings</h4>
						<hr />
						{!saving ? (
							<FadeIn className="settings-container" delay={50}>
								<div className="setting">
									<h5>Pause Online Ordering</h5>
									<p>
										Will turn off the ability for users to
										place orders.
									</p>
									<Switch
										name="Disable Orders"
										color="primary"
										checked={settingsValue.orders}
										onChange={() => onConfig('orders')}
									/>
								</div>
								<div className="setting">
									<h5>Enable Disount On All Items</h5>
									<p>Will enable a 10% discount sitewide.</p>
									<Switch
										name="Enable 10% Off"
										color="primary"
										checked={settingsValue.discount}
										onChange={() => onConfig('discount')}
									/>
								</div>
								<div className="setting">
									<h5>Enable Free Shipping</h5>
									<p>Will enable free shipping sitewide.</p>
									<Switch
										name="Enable free shipping"
										color="primary"
										style={{ margin: 0 }}
										checked={settingsValue.shipping}
										onChange={() => onConfig('shipping')}
									/>
								</div>
							</FadeIn>
						) : (
							<CircularProgress />
						)}
					</FadeIn>

					<Admin />
				</MuiThemeProvider>
			)}
		</div>
	);
};

export default AdminDashboard;

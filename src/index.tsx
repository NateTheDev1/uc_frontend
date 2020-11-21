import React from 'react';
import ReactDOM from 'react-dom';

import './scss/index.scss';

import { Provider } from 'react-redux';

import client from './client';
import store from './store';
import LogRocket from 'logrocket';
import { ApolloProvider } from '@apollo/client';
import App from './App';
LogRocket.init('untangled-cables/uc_frontend');

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Provider>,
	document.getElementById('root')
);

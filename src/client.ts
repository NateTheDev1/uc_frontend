import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://uc-backend.herokuapp.com/graphql',
	cache: new InMemoryCache()
});

export default client;

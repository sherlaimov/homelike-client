import ApolloClient, { InMemoryCache } from "apollo-boost";

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache
});

export default client;

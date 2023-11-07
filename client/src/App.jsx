import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// Bringing in the required import from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/Navbar';
import Footer from './components/Footer';



const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    // The Outlet component will conditionally swap between the different pages according to the URL
    return (
        <ApolloProvider client={client}>
            <div className="flex-column justify-flex-start min-100-vh">
                <Nav />
                <div className="container">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;
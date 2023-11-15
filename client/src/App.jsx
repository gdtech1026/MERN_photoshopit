import './App.css';
import {
    ApolloClient, InMemoryCache, ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import HeaderSpace from './components/HeaderSpace';

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
            <Nav />
            <div>
                <div className='d-flex justify-content-center'>
                    <HeaderSpace /> 
                </div>
                <div className='justify-content-center'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Login from "./Login";
import Profiles from "./Profiles";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Login />
      <Profiles />
    </div>
  </ApolloProvider>
);

export default App;
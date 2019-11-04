import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
// import { ApolloProvider } from '@apollo/react-hooks';
import HomeView from './views/HomeView';
import client from './ApolloClient';
import store from './store';
import ApartmentView from './views/ApartmentView';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/apartments/:apartmentId" component={ApartmentView} />
          </Fragment>
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

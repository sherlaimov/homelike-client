import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import HomeView from './views/HomeView';
import client from './apollo/ApolloClient';
import ApartmentView from './views/ApartmentView';
import SearchView from './views/SearchView';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/search" component={SearchView} />
          <Route exact path="/apartments/:apartmentId" component={ApartmentView} />
        </Fragment>
      </Router>
    </ApolloProvider>
  );
};

export default App;

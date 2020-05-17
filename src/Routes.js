/* @flow */
import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as Views from './views';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Views.Dashboard} />
    </Switch>
  </Router>
);

export default Routes;

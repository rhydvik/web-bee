/* @flow */
import React from 'react';
import { Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as Views from './views';
import Layout from './views/Layout';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Layout exact path="/" component={Views.Dashboard} />
      <Layout path="/types" component={Views.ManageTypes} />
    </Switch>
  </Router>
);

export default Routes;

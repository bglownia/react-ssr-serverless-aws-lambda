import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HeroesOrigins from '../containers/HeroesOrigins';
import HomePage from './HomePage';
import OriginPage from '../containers/OriginPage';

import './App.less';

export default () => (
  <div className="App">
    <nav>
      <Link to="/">Home</Link>
      <HeroesOrigins />
    </nav>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route
        path="/:slug"
        render={({ match }) => (
          <OriginPage origin={match.params.slug} />
        )}
      />
    </Switch>
  </div>
);

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import FilteredPlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
import Battle from './Battle';
import Profile from './Profile';

require('../sass/common.scss');

const App = () => (
  <FilteredPlayerList />
);

const Add = () => (
  <AddPlayer />
);

const BattleField = () => (
  <Battle />
);

const PlayerProfile = () => (
  <Profile />
);

const Root = ({ store }) => (
  <Provider store ={store}>
    <Router history={hashHistory}>
      <Route path='player/add' component={Add} />
      <Route path='player/:id' component={PlayerProfile} />
      <Route path='battle' component={BattleField} />
      <Route path='/(:gender)' component={App} />
    </Router>
  </Provider>
);

export default Root;
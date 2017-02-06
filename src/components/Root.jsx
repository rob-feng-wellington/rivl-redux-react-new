import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import FilteredPlayerList from './PlayerList.jsx';
import AddPlayer from './AddPlayer.jsx';
import Battle from './Battle.jsx';
import Profile from './Profile.jsx';

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
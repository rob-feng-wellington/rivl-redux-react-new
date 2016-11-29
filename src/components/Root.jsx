import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import FilteredPlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
import Battle from './Battle';

require('../sass/common.scss');

const App = () => (
  <MuiThemeProvider>
    <FilteredPlayerList />
  </MuiThemeProvider>
);

const Add = () => (
  <MuiThemeProvider>
    <AddPlayer />
  </MuiThemeProvider>
);

const BattleField = () => (
  <MuiThemeProvider>
    <Battle />
  </MuiThemeProvider>  
);

const Root = ({ store }) => (
  <Provider store ={store}>
    <Router history={hashHistory}>
      <Route path='player/add' component={Add} />
      <Route path='battle' component={BattleField} />
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
);

export default Root;
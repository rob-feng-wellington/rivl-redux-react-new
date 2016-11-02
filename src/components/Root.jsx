import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import FilteredPlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
import Footer from './Footer';


const App = () => (
  <div>
    <FilteredPlayerList />
    <Footer />
  </div>
);

const Add = () => (
  <MuiThemeProvider>
    <AddPlayer />
  </MuiThemeProvider>
);

const Root = ({ store }) => (
  <Provider store ={store}>
    <Router history={hashHistory}>
      <Route path='player/add' component={Add} />
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
);

export default Root;
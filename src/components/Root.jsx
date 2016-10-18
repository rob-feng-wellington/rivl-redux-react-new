import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import FilteredPlayerList from './PlayerList';
import AddPlayer from './AddPlayer';
import Footer from './Footer';

//************ App start ***************/
const App = () => (
  <div>
    <AddPlayer />
    <FilteredPlayerList />
    <Footer />
  </div>
);
//************ App finish ***************/

const Root = ({ store }) => (
  <Provider store ={store}>
    <Router history={hashHistory}>
    	<Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
);

export default Root;
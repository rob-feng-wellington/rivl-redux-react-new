import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);
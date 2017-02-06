import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import configureStore from './configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<div>
		<Header />
  	<Root store={store} />
  	<Footer />
  	</div>
  </MuiThemeProvider>,
  document.getElementById('app')
);
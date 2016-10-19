import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import battleApp from './reducer';


const configureStore = () => {
	const store = createStore(battleApp);
  const middlewares = [promise];

  if(process.env.NODE_ENV !== 'production') {
   middlewares.push(createLogger());
  }

	return createStore(
    battleApp,
    //persistData goes here if any
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
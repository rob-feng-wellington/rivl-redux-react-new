import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import battleApp from './reducer';

const configureStore = () => {
	const store = createStore(battleApp);
  const middlewares = [thunk];

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
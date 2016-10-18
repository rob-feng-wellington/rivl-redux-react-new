import { createStore } from 'redux';
import battleApp from './reducer';
import { loadState, saveState } from './localstorage';
import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if(!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'clor: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue; 
  }
}

const configureStore = () => {
	const persistedState = loadState();

	const store = createStore(battleApp, persistedState);

  if(process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

	store.subscribe(throttle(() => {
	  saveState({
	    players: store.getState().players
	  })
	}, 1000));

	return store;
};

export default configureStore;
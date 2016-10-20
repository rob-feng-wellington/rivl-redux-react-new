import { combineReducers } from 'redux';
import byId, * as fromById from './reducers/byId';
import createList, * as fromList from './reducers/createList';

const listByFilter = combineReducers({
  all: createList('all'),
  male: createList('male'),
  female: createList('female'),
});

const players = combineReducers({
  byId,
  listByFilter
});

const battleApp = combineReducers({
  players   
});

export default battleApp;

export const getPlayersByGender = (state, filter) => {
  const ids = fromList.getIds(state.players.listByFilter[filter]);
  return ids.map(id => fromById.getPlayer(state.players.byId, id));
};

export const getIsFetching = (state, filter) => 
  fromList.getIsFetching(state.players.listByFilter[filter]);
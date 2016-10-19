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


//************ Get players based on gender start *************/
export const getPlayersByGender = (state, filter) => {
  const ids = fromList.getIds(state.players.listByFilter[filter]);
  return ids.map(id => fromById.getPlayer(state.players.byId, id));
};
//************ Get players based on gender end *************/
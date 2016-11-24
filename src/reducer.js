import { combineReducers } from 'redux';
import byId, * as fromById from './reducers/byId';
import createList, * as fromList from './reducers/createList';
import createBattle, * as fromBattle from './reducers/createBattle';

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
  players,
  battle: createBattle()
});

export default battleApp;

export const getPlayersByGender = (state, filter) => {
  const ids = fromList.getIds(state.players.listByFilter[filter]);
  return ids.map(id => fromById.getPlayer(state.players.byId, id));
};

export const getIsFetching = (state, filter) => 
  fromList.getIsFetching(state.players.listByFilter[filter]);

export const getErrorMessage = (state, filter) => 
  fromList.getErrorMessage(state.players.listByFilter[filter]);

export const getBattlePair = (state) =>
  fromBattle.getBattlePair(state.battle);

export const getIsSubmitted = (state) =>
  fromBattle.getIsSubmitted(state.battle);

export const getBattleResults = (state) =>
  fromBattle.getBattleResults(state.battle);

export const getBattleNewScores = (state) =>
  fromBattle.getBattleNewScores(state.battle);
import { combineReducers } from 'redux';
import byId, * as fromById from './reducers/byId';
import createList, * as fromList from './reducers/createList';
import createBattle, * as fromBattle from './reducers/createBattle';
import createAvatar, * as fromAvatar from './reducers/createAvatar';
import createPlayer, * as fromCreatePlayer  from './reducers/createPlayer';
import createProfile, * as fromProfile from './reducers/createProfile';

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
  battle: createBattle(),
  avatars: createAvatar(),
  newPlayer: createPlayer(),
  profile: createProfile()
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

export const getAvatars = (state) =>
  fromAvatar.getAvatars(state.avatars);

export const getAvatarsIsFetching = (state) => 
  fromAvatar.getIsFetching(state.avatars);

export const getIsAddingPlayer = (state) =>
  fromCreatePlayer.getIsAdding(state.newPlayer);

export const getProfileIsFetching = (state) => 
  fromProfile.getIsFetching(state.profile);

export const getProfile = (state) => 
  fromProfile.getProfile(state.profile);

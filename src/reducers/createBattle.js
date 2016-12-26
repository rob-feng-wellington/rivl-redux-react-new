import { combineReducers } from 'redux';

const createBattle = () => {
  const pairIds = (state = {playerA: null, playerB: null}, action) => {
    switch (action.type) {
      case 'BATTLE_PLAYER_SELECT':
        return Object.assign({}, state, action.data);
      case 'REINITIAL_BATTLE':
        return {playerA: null, playerB: null};
      default:
        return state;
    }
  };

  const results = (state = [], action) => {
    switch(action.type) {
      case 'ADD_BATTLE_RESULT':
        return [...state, action.data];
      case 'REMOVE_BATTLE_RESULT':
        return [ ...state.slice(0, action.data), ...state.slice(action.data + 1) ];
      case 'REINITIAL_BATTLE':
        return [];
      default:
        return state;
    }
  }

  const newScores = (state = {playerA: null, playerB: null}, action) => {
    switch(action.type) {
      case 'UPDATE_NEW_SCORE':
        return {playerA: action.data.playerA, playerB: action.data.playerB};
      case 'REINITIAL_BATTLE':
        return {playerA: null, playerB: null}
      default:
        return state;
    }
  }

  return combineReducers({
    pairIds,
    results,
    newScores
  })
};

export default createBattle;

export const getBattlePair = (state) => state.pairIds;

export const getBattleResults = (state) => state.results;

export const getBattleNewScores = (state) => state.newScores;